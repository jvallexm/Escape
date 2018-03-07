const path        = require("path");
const mongodb     = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url         = process.env.MONGO_URL;

function getAll(callback){

    MongoClient.connect(url,(err,db)=>{

        if(err) throw err;
        let submissions = db.db("escape").collection("personals");
        submissions.find({},{})
                   .toArray((err,data)=>{
                       callback(data);
                       db.close();
                   })

    });

}

module.exports = function(app){
    
    app.get(`/api/friends`,(req,res)=>{

        getAll((data)=>{
            res.send(data);
        })

    });
    
    app.post(`/api/friends`,(req,res)=>{
    
        console.log("***** NEW SUBMISSION *****")
        
        getAll((submissions)=>{

            MongoClient.connect(url,(err,db)=>{

                if(err) throw err;
                let personals = db.db("escape").collection("personals");
                personals.insert(req.body,()=>{
                    res.send(true)
                    db.close();
                });

            });

        });
    
    });

}