const path     = require("path");

module.exports = function(app){
    
    app.get(`/api/friends`,(req,res)=>{

    });
    
    app.post(`/api/friends`,(req,res)=>{
    
        console.log("***** NEW SUBMISSION *****")
        console.log(req.body);
        res.send("ding");
    
    });

}