const express    = require("express");
const bodyParser = require("body-parser");
const path       = require("path");

const port       = process.env.PORT || 8080;
const app        = express();

app.listen(port, ()=> console.log(`listening on port ${port}`));

// Body Parser Middlewear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/********* API ROUTES ********/

app.get(`/api/friends`,(req,res)=>{

});

app.post(`/api/friends`,(req,res)=>{

    console.log(req.body);

});

/********* HTML ROUTES ********/

// Express static middlewear
app.use("/",express.static('app/public'));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + `/app/public/home.html`));
});

app.get("/survey",(req,res)=>{
    res.sendFile(path.join(__dirname + `/app/public/survey.html`));
});