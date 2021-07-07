//jshint esversion:10
require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
// const axios = require("axios");
const request = require("request");

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
    (async function movieRequest() {
        const reqDone = await request(url, function (error, response, body) {
        const info = JSON.parse(body);
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
    });
})();
});

app.post("/search", (req, res) => {
    res.redirect("/");
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running");
});
// (async function movie(){axios.get(url).then(response => {
//     var res = await response.data;
//     if (response.data.Response === "True") {
//         const info = response.data;
//         res.render("result", { info: info, IMDB: typeof response.data.Ratings[0] === 'undefined'? "N/A" :response.data.Ratings[0].Value,
//          Meta: typeof response.data.Ratings[1] === 'undefined'? "N/A" :response.data.Ratings[2].Value,
//           Rotten:  typeof response.data.Ratings[2] === 'undefined'? "N/A" :response.data.Ratings[1].Value });
//     }
//     else {
//         res.render("failure");
//     }
// }).catch{
//     console.log(error);
// };