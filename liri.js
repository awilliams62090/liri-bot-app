require("dotenv").config();
var request= require("request");
var keys= require("./keys.js");
var Spotify= require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

function concertThis(artist){
var queryURL= "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
request(queryURL, function(err, response, body){
    if(err){
        console.log(err)
    };
    var data= JSON.parse(body);
    for(var i=0; i < data.length; i++){
        console.log(data[i].venue.name + ", " + data[i].venue.city + ", " + moment(data[i].datetime).format("MM/DD/YYYY"));
    

    }
})};
concertThis(process.argv[2]);

function spotifyThisSong(songName){
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
};

function movieThis(){

};

function doWhatItSays(){

};
