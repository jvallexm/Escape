const path        = require("path");
const mongodb     = require('mongodb');
const MongoClient = mongodb.MongoClient;

module.exports = function(app){
    
    app.get(`/api/friends`,(req,res)=>{

    });
    
    app.post(`/api/friends`,(req,res)=>{
    
        console.log("***** NEW SUBMISSION *****")
        console.log(req.body);
        res.send("ding");
    
    });

}