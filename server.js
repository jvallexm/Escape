const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");
const env        = require('dotenv').config();

const port       = process.env.PORT || 8080; // Initialize the port
const app        = express();                // Initializes express

app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog

app.use( bodyParser.urlencoded({ extended: false }) ); 
app.use( bodyParser.json()                          );
app.use( "/", express.static('app/public')          ); // Expresses the public file as static

const html = require("./app/routing/htmlRoutes.js")(app); // Handles HTML routes 
const api  = require("./app/routing/apiRoutes.js")(app);  // Handles API routes 

// Sends the 404 page if the request isn't handled 

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname + `/app/public/404.html`));
});

