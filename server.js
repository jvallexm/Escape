const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");

const port       = process.env.PORT || 8080;
const app        = express();

app.listen(port, ()=> console.log(`listening on port ${port}`));

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json()                          );
app.use( "/", express.static('app/public')          );

const html = require("./app/routing/htmlRoutes.js")(app);
const api  = require("./app/routing/apiRoutes.js")(app);

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname + `/app/public/404.html`));
});

