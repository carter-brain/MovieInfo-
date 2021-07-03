//jshint esversion:6
require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const { info } = require("console");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("index");
});
app.post("/", (req, res) => {
    const query = req.body.movie;
    const url = "https://www.omdbapi.com/?t=" + query + "&apikey=" + process.env.API_KEY + "&plot=full";
    console.log(url);
      request(url, function(error, response, body){
          const info = JSON.parse(body);
          var IMDB = "";
          var Meta = "";
          var Rotten = "";
          for(let i = 0; i < info.Ratings.length; i++){
            if(info.Ratings[i].Source ===  "Internet Movie Database"){
                IMDB = info.Ratings[i].Value;
                break;
            }else{
                IMDB = "N/A";
            }
        }
        for(let i = 0; i < info.Ratings.length; i++){
            if(info.Ratings[i].Source ===  "Metacritic"){
               Meta = info.Ratings[i].Value;
               break;
            }else{
                Meta = "N/A";
            }
        }
        for(let i = 0; i < info.Ratings.length; i++){
            if(info.Ratings[i].Source === "Rotten Tomatoes"){
                Rotten = info.Ratings[i].Value;
                break;
            }else{
                Rotten = "N/A";
            }
        }
          res.render("result.ejs", {info: info, IMDB: IMDB, Meta: Meta, Rotten: Rotten});
    }); 
});
app.get("/result", (req, res)=>{
    res.render('result.ejs');
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is up and running in port 3000");
});
 