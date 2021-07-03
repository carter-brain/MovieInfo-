//jshint esversion:10
require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", (req, res) => {
    const query = req.body.movie;
    const url = "https://www.omdbapi.com/?t=" + query + "&apikey=" + process.env.API_KEY + "&plot=full";
    axios.get(url).then(response => {
       console.log(url);
        if (response.data.Response === "True") {
            const info = response.data;
            var IMDB = "";
            var Meta = "";
            var Rotten = "";
            for (let i = 0; i < info.Ratings.length; i++) {
                if (info.Ratings[i].Source === "Internet Movie Database") {
                    IMDB = info.Ratings[i].Value;
                    break;
                } else {
                    IMDB = "N/A";
                }
            }
            for (let i = 0; i < info.Ratings.length; i++) {
                if (info.Ratings[i].Source === "Metacritic") {
                    Meta = info.Ratings[i].Value;
                    break;
                } else {
                    Meta = "N/A";
                }
            }
            for (let i = 0; i < info.Ratings.length; i++) {
                if (info.Ratings[i].Source === "Rotten Tomatoes") {
                    Rotten = info.Ratings[i].Value;
                    break;
                } else {
                    Rotten = "N/A";
                }
            }

            res.render("result", { info: info, IMDB: IMDB, Meta: Meta, Rotten: Rotten });
        }
        else {
            res.render("failure");
        }
    });

});
app.get("/failure", (req, res) => {
    res.render("failure");
});
app.post("/search", (req, res) => {
    res.redirect("/");
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running");
});
// //jshint esversion:6
// require("dotenv").config();

// const express = require("express");
// const ejs = require("ejs");
// const bodyParser = require("body-parser");
// const request = require("request");

// const app = express();
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));
// app.set('view engine', 'ejs');


// app.get("/", (req, res) => {
//     res.render("index");
// });
// app.post("/", (req, res) => {
//     const query = req.body.movie;
//     const url = "https://www.omdbapi.com/?t=" + query + "&apikey=" + process.env.API_KEY + "&plot=full";
//       request(url, function(error, response, body){
//           const info = JSON.parse(body);
//           var IMDB = "";
//           var Meta = "";
//           var Rotten = "";
//           for(let i = 0; i < info.Ratings.length; i++){
//             if(info.Ratings[i].Source ===  "Internet Movie Database"){
//                 IMDB = info.Ratings[i].Value;
//                 break;
//             }else{
//                 IMDB = "N/A";
//             }
//         }
//         for(let i = 0; i < info.Ratings.length; i++){
//             if(info.Ratings[i].Source ===  "Metacritic"){
//                Meta = info.Ratings[i].Value;
//                break;
//             }else{
//                 Meta = "N/A";
//             }
//         }
//         for(let i = 0; i < info.Ratings.length; i++){
//             if(info.Ratings[i].Source === "Rotten Tomatoes"){
//                 Rotten = info.Ratings[i].Value;
//                 break;
//             }else{
//                 Rotten = "N/A";
//             }
//         }

//         res.render("result", {info: info, IMDB: IMDB, Meta: Meta, Rotten: Rotten});
//     }); 

// });


// app.listen(process.env.PORT || 3000, ()=>{
//     console.log("Server is up and running");
// });
