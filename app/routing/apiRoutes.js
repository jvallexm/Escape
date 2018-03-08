const path        = require("path");
const mongodb     = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url         = process.env.MONGO_URL;

/** Gets all of the personals from the MongoDB and returns them in a callback function **/

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

/** Returns the sum of the absolute value of difference of the same index of each array  **/

function returnDifference(arr1,arr2){

    let sum = 0;
    for(let i=0;i<arr1.length;++i){
        sum += Math.abs(arr1[i] - arr2[i]);
    }
    return sum;

}

/** Handles the two API requests, get and post**/

module.exports = function(app){
    
    // Sends all the entries in the database 

    app.get(`/api/friends`,(req,res)=>{

        getAll((data)=>{
            res.send(data);
        })

    });

    // Posts new surveys to the database
    
    app.post(`/api/friends`,(req,res)=>{
    
        console.log("***** NEW SUBMISSION *****")

        // Creates a new user object from the request object

        let newUser = {
            name:   req.body.name,
            photo:  req.body.photo,
            scores: []
        }

        // Adds parsed ints from the passed scores array to the new user object

        req.body["scores[]"].forEach(
            i => newUser.scores.push(parseInt(i))
        );

        // Gets all the submission
        
        getAll((submissions)=>{

            let bestMatch;    // The best match to be sent to the user
            let currentMatch; // The score of the bestMatch to compare new matches to

            submissions.forEach((i)=>{

                if(!bestMatch){  // If there is no best match...
                    
                    bestMatch    = i;
                    currentMatch = returnDifference(newUser.scores,i.scores);

                } else {
                    
                   let nextMatch = returnDifference(newUser.scores,i.scores);
                   
                   // If the difference of the next item in the array is less than the current one it makes bestMatch the current item

                   if(nextMatch < currentMatch){ 

                        bestMatch    = i;
                        currentMatch = nextMatch;

                   }

                }

            });

            res.send(bestMatch); // Returns the best Match

            // Inserts the new user into the database

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