require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var liriFunc = process.argv[2];
var userSearch = process.argv[3];
for (var i = 3; i < process.argv.length; i++) {
    if (i > 3 && i < process.argv.length) {
        userSearch = userSearch + " " + process.argv[i];
    }
};

//Switch case that passes in the function in process.argv[2]
switch (liriFunc) {
    case "concertThis":
        concertThis();
        break;

    case "spotifyThisSong":
        spotifyThisSong();
        break;

    case "movieThis":
        movieThis();
        break;

    case "doWhatItSays":
        doWhatItSays();
        break;
};

function concertThis(artist) {
    if (!artist) {
        artist = userSearch;
    };
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryURL, function (err, data, body) {
        if (err) {
            console.log(err)
        };
        var data = JSON.parse(body);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].venue.name + ", " + data[i].venue.city + ", " + moment(data[i].datetime).format("MM/DD/YYYY"));
        };
    });
};

function spotifyThisSong(songName) {
    if (!songName) {
        songName = userSearch;
    };
    console.log(songName);
    spotify.search({
        type: 'track',
        query: songName
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log("Song Name: " + "'" + songName.toUpperCase() + "'" + "\n" + "Album Name: " + data.tracks.items[0].album.name + "\n" + "Artist Name: " + data.tracks.items[0].album.artists[0].name + "\n" + "URL: " + data.tracks.items[0].album.external_urls.spotify);
        }
    });
};


function movieThis(movieName) {
    //     * Title of the movie.
    //    * Year the movie came out.
    //    * IMDB Rating of the movie.
    //    * Rotten Tomatoes Rating of the movie.
    //    * Country where the movie was produced.
    //    * Language of the movie.
    //    * Plot of the movie.
    //    * Actors in the movie.
    if (!movieName) {
        movieName = userSearch;
    };
    console.log(movieName)
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Then log the Release Year for the movie
            console.log("Movie Title: " + JSON.parse(body).Title + "\n" + "Movie Year: " + JSON.parse(body).Year + "\n" + "Movie Rating: " + JSON.parse(body).Rated + "\n" + "IMDB Rating: " + JSON.parse(body).Ratings[0].Value + "\n" + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n" + "Produced in: " + JSON.parse(body).Country + "\n" + "Movie Language(s): " + JSON.parse(body).Language + "\n" + "Movie Plot: " + JSON.parse(body).Plot + "\n" + "Movie Actors: " + JSON.parse(body).Actors);
        }
    });


};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        userSearch = data.split(",");
        console.log(userSearch[0] + "\n" + userSearch[1]);
        if (userSearch[0] === "spotify-this-song") {
            spotifyThisSong(userSearch[1]);
            console.log(userSearch);
        } else if (userSearch[0] === "concert-this") {
            artist = userSearch[1];
            console.log(artist);
            concertThis(artist);
        } else if (userSearch[0] === "movie-this") {
            //    movieName = userSearch[1];
            movieThis(userSearch[1]);
            console.log(userSearch);
        }
    });

};