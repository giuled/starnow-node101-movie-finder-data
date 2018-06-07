const express = require('express');
var morgan = require("morgan");
var axios = require("axios");

const app = express();

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.use(morgan("dev"));

var movies = [];
var movieIds = [];

app.get("/", function(req, res){

    for(let i = 0; i < movieIds.length; i++){
        if(movieIds[i] == req.query.i || req.query.t == movieIds[i]){
            console.log(movieIds[i]);
            console.log(req.query.i);
            res.send(movies[i].data);
            break;
        }
    }

    if(req.query.hasOwnProperty("i")){
        axios
        .get('http://www.omdbapi.com/?i=' + req.query.i + '&apikey=8730e0e')
        .then(response => {    
        movieIds.push(req.query.i);
        movies.push(response);
        res.send(response.data);
        })
        .catch(error => {
            console.log(error);
            res.send("error");
        })
        
    }else{
        console.log(req.query);
        axios
        .get('http://www.omdbapi.com/?t=' + req.query.t + '&apikey=8730e0e')
        .then(response => {    
        movieIds.push(req.query.t);
        movies.push(response);
        res.send(response.data);
        })
        .catch(error => {
        console.log(error);
        res.send("error");
    })

    }
    
});

module.exports = app;