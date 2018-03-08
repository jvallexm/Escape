const path     = require("path");

/** Handles the HTML routes and serves the appropriate HTML file **/

module.exports = function(app){

    app.get("/",(req,res)=>{

        res.sendFile(path.join(__dirname + `/../public/home.html`));
        
    });

    app.get("/survey",(req,res)=>{

        res.sendFile(path.join(__dirname + `/../public/survey.html`));
        
    });

}