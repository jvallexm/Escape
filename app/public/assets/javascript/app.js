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

function handleSubmit(){

    let responses = [];
    let name      = $("#name").val().trim();
    let photo     = $("#photo").val().trim();
   
    for(let i=0;i<survey.length;++i){
      let val = $(`#select-${i}`).val();
      console.log(val);
      responses.push(val);
    }
   
    if(responses.indexOf("-") !== -1){
      
      for(let i=0;i<survey.length;i++){
        
        $(`#select-${i}`).css("background-color","#EF476F")
        
      }
      
      throwError("You have unsanswered survey questions!");
      
    } else if(name == "" || name.length < 5) {
      
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
      throwError("Ready!");
    }

}
  
  $(document).ready(function(){
         
      // Creates questions when the page has loaded 

      for(let i=0;i<10;++i){
        $("#question-" + i).append(createPanel(i))
      }
      
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
  
  });