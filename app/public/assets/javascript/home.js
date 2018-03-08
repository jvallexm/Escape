// Handles button clicks for home.html

$(document).ready(function(){

    $("#survey").on("click",function(){
        window.location.replace("/survey");
    });

    $("#gh").on("click",function(){
        window.open("https://github.com/jvallexm/FriendFinder");
    });

    
});