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

function returnDifference(arr1,arr2){

    let sum = 0;
    for(let i=0;i<arr1.length;++i){
        sum += Math.abs(arr1[i] - arr2[i]);
    }
    return sum;

}

module.exports = function(app){
    
    app.get(`/api/friends`,(req,res)=>{

        getAll((data)=>{
            res.send(data);
        })

    });
    
    app.post(`/api/friends`,(req,res)=>{
    
        console.log("***** NEW SUBMISSION *****")

        let newUser = {
            name:   req.body.name,
            photo:  req.body.photo,
            scores: []
        }

        req.body["scores[]"].forEach(i => newUser.scores.push(parseInt(i)));
        
        getAll((submissions)=>{

            let bestMatch;
            let currentMatch;

            submissions.forEach((i)=>{

                if(!bestMatch){

                    bestMatch    = i;
                    currentMatch = returnDifference(newUser.scores,i.scores);

                } else {
                    
                   let nextMatch = returnDifference(newUser.scores,i.scores);
                   
                   if(nextMatch < currentMatch){

                    bestMatch    = i;
                    currentMatch = nextMatch;

                   }

                }

            });

            res.send(bestMatch);

            MongoClient.connect(url,(err,db)=>{

                if(err) throw err;
                let personals = db.db("escape").collection("personals");
                personals.insert(newUser,()=>{
                    db.close();
                });

            });

        });
    
    });

}