//jshint esversion:10
require("dotenv").config();

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
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
    if (response.data.Response === "True") {
        const info = response.data;
        res.render("result", { info: info, IMDB: typeof response.data.Ratings[0] === 'undefined'? "N/A" :response.data.Ratings[0].Value,
         Meta: typeof response.data.Ratings[1] === 'undefined'? "N/A" :response.data.Ratings[2].Value,
          Rotten:  typeof response.data.Ratings[2] === 'undefined'? "N/A" :response.data.Ratings[1].Value });
          res.render("result", {info: info, IMDB: IMDB, Meta: Meta, Rotten: Rotten});
    }
    else {
        res.render("failure");
    }
})
});

app.post("/search", (req, res) => {
    res.redirect("/");
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running");
});
