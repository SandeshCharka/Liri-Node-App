require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var bandsInTown = keys.bandsInTown;
var omdb = keys.omdb;

var type = process.argv[2];
var value = process.argv.slice(3).join(" ");

function outputData(data) {
    console.log(data)
    fs.appendFile("log.txt", "\r\n" + data, function (err) {
        if (err) {
            return console.log(err)
        }
    });
};

switch (type) {
    case "spotify-this-song":
        if (process.argv[3] === undefined) {
            spotifyThisSong("The Sign");
        } else {
            spotifyThisSong(value);
        }
        break;
    case "concert-this":
        concertThis(value);
        break;
    case "movie-this":
        if (process.argv[3] === undefined) {
            movieThis("Mr. Nobody");
        } else {
            movieThis(value);
        }
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        data = data.split(",");
        type = data[0];
        value = data[1].replace(/"|'/g, '');
        if (err) {
            return console.log(err);
        }
        switch (type) {
            case "spotify-this-song":
                spotifyThisSong(value);
                break;
            case "concert-this":
                concertThis(value);
                break;
            case "movie-this":
                movieThis(value);
                break;
        }
    })
};

function movieThis(movieName) {
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&apikey=" + omdb).then(function (response) {
        outputData("----------------------------------------------");
        outputData("Searching OMDB for: " + movieName);
        outputData("----------------------------------------------");
        outputData("Movie Title: " + response.data.Title);
        outputData("Release Year: " + response.data.Year);
        outputData("IMDB Rating: " + response.data.imdbRating);
        outputData("Rotten Tomatoes: " + response.data.Ratings[1].Value);
        outputData("Country of Origin: " + response.data.Country);
        outputData("Languages: " + response.data.Language);
        outputData("Plot: " + response.data.Plot);
        outputData("Actors: " + response.data.Actors);
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

function concertThis(artistName) {

    axios.get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=" + bandsInTown).then(function (response) {
        outputData("----------------------------------------------");
        outputData("Searching Bands-In-Town for: " + artistName);
        outputData("----------------------------------------------");
        for (var i = 0; i < response.data.length; i++) {
            outputData(i + 1);
            outputData("Venue Name: " + response.data[i].venue.name);
            outputData("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            outputData("Date: " + moment(response.data[i].datetime).format('L'));
            outputData("----------------------------------------------");
        }
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
}

function spotifyThisSong(songName) {
    spotify.search({
        type: 'track',
        query: songName,
        limit: 10
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        outputData("----------------------------------------------");
        outputData("Searching Spotify for: " + songName);
        outputData("----------------------------------------------");
        for (var i = 0; i < data.tracks.items.length; i++) {
            outputData(i + 1);
            outputData("Artist Name: " + data.tracks.items[i].artists[0].name);
            outputData("Song Name: " + data.tracks.items[i].name);
            outputData("Spotify Link: " + data.tracks.items[i].external_urls.spotify);
            outputData("Album Name: " + data.tracks.items[i].album.name);
            outputData("----------------------------------------------");
        }
    });
}