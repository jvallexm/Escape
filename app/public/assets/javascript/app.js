// Survey questions

const survey = [{
    "q": "I read the paper in bed"
},{
    "q": "I like the feel of the ocean"
},{
    "q": "I am into champagne"
},{
    "q": "I like getting caught in the rain"
},{
    "q": "I am not into yoga"
},{
    "q": "I have half a brain"
},{
    "q": "I'm nobody's poet"
},{
    "q": "I'm not much into health food"
},{
    "q": "I like pina coladas"
},{
    "q": "I like making love at midnight in the dunes of the cape"
}];

// Returns new divs
function newDiv(addClass){
  
    return $("<div>").addClass(addClass);
    
}

// Returns new options

function newOption(opt){
    
    return $("<option>").text(opt);
    
}

// creates a dropdown menu for the index i

function createDropDown(i){
      
      let options = ["-","Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"];
      let select  = $("<select>").addClass("form-control").attr("id","select-" + i);

      options.forEach(i => {

        let opt = newOption(i).attr("value",i);
        select.append(opt);

      });
      return select;
          
    
}

// Creates panel with the index of i for the question 1
  
function createPanel(i,q){
    
      let panel    = newDiv("panel panel-default");
      let head     = newDiv("panel-heading")
      let title    = newDiv("panel-title").text(`Question ${i+1}`);
      let body     = newDiv("panel-body")
      let bodyText = newDiv("question middle-text").text(survey[i].q);
      let select   = createDropDown(i);

      head .append(title);
      panel.append(head);
      body .append(bodyText);
      body .append(select);
      panel.append(body);

      return panel;
   
}

// Displays form errors
  
function throwError(err){
      
    $("#error").removeClass("hide").text(err);
    
}

// handles the submission of the form

function handleSubmit(){

    let responses = [];                       // Responses to the questions
    let name      = $("#name").val().trim();  // Name of the user
    let photo     = $("#photo").val().trim(); // Photo URL
   
    // For each of the survey questions it gets the value and appends it to result

    for(let i=0;i<survey.length;++i){

      let val = $(`#select-${i}`).val();
      console.log(val);
      responses.push(val);

    }

    // Data validation

    if(responses.indexOf("-") !== -1){
      
      for(let i=0;i<survey.length;i++){
        
        $(`#select-${i}`).css("background-color","#EF476F")
        
      }
      
      throwError("You have unsanswered survey questions!");
      
    } else if(name == "" || name.length < 4) {
      
      throwError("Names must be at least 3 characters");
      
    } else if(photo == "") {
      
      throwError("You must include a photo");
      
    } else if(name.length > 35){
      
      throwError("Names cannot be more than 35 characters");
      
    } else if(photo.length > 300) {
      
      throwError("Sorry, your photo URL is too long!")
      
    } else if (!/\https?:\/\/(www)?.{5,75}\.(com|net|io|org)\/.{5,150}\.(jpg|jpeg|png|gif)/.test(photo) || photo[0] !== "h"){
      
      throwError("please enter a valid image URL");
       
    } else {
      
        // The object to be sent to the server

        let sendObj = {
            name: name,
            photo: photo,
            scores: []
        }

        // A list of the scores with the indecies representing their numerical value

        let scores = ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"];

        // Parses the values of the survey and convers them to numbers based on the scores

        for(let i=0;i<survey.length;++i){
            let score = 1 + scores.indexOf($(`#select-${i}`).val());
            sendObj.scores.push(score);
        }

        // Sends a post request to the api route with the new object

        $.ajax({

            type: "POST",
            url: `/api/friends`,
            data: sendObj,
            dataType: `json`

        }).done((data)=>{

            // Once it has the data...

            makeMatch(sendObj,data);

        });

    }

}

function makeMatch(you,match){
    $(".match").text(match.name);
    $("#you-img").attr("src",you.photo);
    $("#you-name").text(you.name);
    $("#match-img").attr("src",match.photo);
    $("#gray-out").removeClass("hide");
}

$(document).ready(function(){

      // Disables the submit button

      $("#submit").prop("disabled",true);
         
      // Creates questions when the page has loaded 

      for(let i=0;i<10;++i){
        $("#question-" + i).append(createPanel(i))
      }
      
      // Enables the submit button once the questions have rendered

      $("#submit").prop("disabled",false);

      // When the form is submitted... 

      $("form").on("submit",function(e){
        
         e.preventDefault();  
         $("#error").addClass("hide");
         console.log("submitted!");
         handleSubmit();
      }); 
      
      // Changes highlighted select fields from pink to white

      $("body").on("change","select",function(){
         if( $(this).val() !== "-")
           $(this).css("background-color","white");
      });

      $("#home").on("click",function(){
        window.location.replace("/");
      });

      $("#all").on("click",function(){
        window.location.replace("/api/friends");
      });

  });