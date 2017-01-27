var googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_MAPS_KEY,
	Promise: Promise
});
var fs = require('fs');
var selfie = require('./selfie.js');
var mongoose = require('mongoose');
var models = require('./model.js')(mongoose);



// Local
var allDestinations;
var currentTrip = {};
var currentTripNum = 0;

var currentTripDest = {address: ''};
var currentTripDestName = undefined;
var currentTripTweet = '';

var currentStepDest = undefined;

// initial location
var currentLoc = {
	lat: 41.828340, 
	lng: -71.398070
};
var currentLocNum = 0;

var updateInterval = 3000;
var moveRange = {lat: 0.00004, lng: 0.00004};
var speed = 28;


module.exports = {
	init: function(){
		allDestinations = JSON.parse(fs.readFileSync('./src/places.json', 'utf8'));

		module.exports.getTrip();
	},
	getTrip: function(){
	// Get New Trip from DB
	// var dest = Destinations.findOne().sort({name: -1}).exec(function(err, result){

		// if(err){ console.log(err); }
		// console.log('///////////////////////////\n' +
		// 			'😘  loading New Destination from DB = : '+ result.name + " (" + result.end_address +")\n" +
		// 			'///////////////////////////');
		console.log("getting trip ( " + currentTripNum + " )");

		var newTrip = allDestinations[currentTripNum];

		currentTripDestName     = newTrip.name;
		currentTripTweet        = newTrip.tweet;

		currentTripDest.address = newTrip.address;


		// Convert New Trip destination into LatLng
		googleMapsClient.geocode(currentTripDest, function(err, res){

			// Update Current Trip Num
			if(currentTripNum == allDestinations.length - 1){
				currentTripNum = 0;
			}
			else{
				currentTripNum++;
			}

			if(err){ // if fails, get next trip
				console.log("FAILED");
				module.exports.getTrip();
			}
			else{

				var newDestLatlng  = res.json.results[0].geometry.location; //latlng

				// CalculateDirection
				module.exports.getDirection(currentLoc, newDestLatlng).then(function(res){

					if(res.json.status === "OK"){
						var placeid = res.json.place_id;

						// Update currentTrip with new Trip
						currentTrip = res.json.routes[0].legs[0];
						// module.exports.getPlaceName().then(function(err, res){
						// 	console.log(err);
						// 	console.log(res);
						// });

						// Start Trip
						module.exports.startTrip();

					}
					else{
						// if fails, get next trip
						console.log("getDirection failed ::::  Getting New Trip")
						module.exports.getTrip();
					}
				});
			}
		});
	},

	getDirection: function(origin, destination){
		var params = {
			origin : origin,// LatLng,
			destination: destination
		};
		return googleMapsClient.directions(params).asPromise();
	},

	startTrip: function(){
		console.log("Starting new trip to " + currentTrip.address);
		console.log("Destination is " + currentTrip.end_location.lat + " / " + currentTrip.end_location.lng);

		currentTrip.nextStepNum = 0;
		module.exports.startStep();

	},

	startStep: function(){
		if(currentTrip.nextStepNum < currentTrip.steps.length){
			console.log("=== calculating " + currentTrip.nextStepNum + " of " + currentTrip.steps.length + " step ===");

			var nextStep = currentTrip.steps[currentTrip.nextStepNum];
			// distance by values 
			var distance = nextStep.distance.value / speed;

			// actual distance by latlng
			var distanceLat = nextStep.end_location.lat - currentLoc.lat;
			var distanceLng = nextStep.end_location.lng - currentLoc.lng;

			// moveRange = latlng per distance value
			moveRange.lat = distanceLat / distance;
			moveRange.lng = distanceLng / distance;

			module.exports.moveMori(nextStep);
		}
		else{
			// if there is no steps left in this trip, 
			console.log('**********===== end of trip! =====**********\n lemme take a selfie');

			// take a selfie
			// selfie.takeSelfie(currentTripTweet);

			// get new trip
			module.exports.getTrip();
		}
	},

	moveMori: function(nextStep){

		var moveInterval = setInterval( function(){

			// Depending on direction, 
			if((moveRange.lat > 0 && currentLoc.lat < nextStep.end_location.lat) ||
			   (moveRange.lat < 0 && currentLoc.lat > nextStep.end_location.lat)){

				currentLoc.lat += moveRange.lat;
				currentLoc.lng += moveRange.lng;

				module.exports.saveLoc();
			}
			// If reached, start next step
			else{
				console.log("--end of step-- : " + currentLoc);
				currentTrip.nextStepNum++;
				module.exports.startStep();

				clearInterval(moveInterval);
			}
		}, updateInterval);
	},

	// Saving Locations in db for future use..
	saveLoc: function(loc){
		var rawDate = new Date();
		var date = String(rawDate.getFullYear()) + String(rawDate.getMonth()) + String(rawDate.getDate()) + String(rawDate.getHours()) + String(rawDate.getMinutes()) + String(rawDate.getSeconds());

		var dbLoc = new models.DbLoc();
		dbLoc.date     = date;
		dbLoc.lat 	   = currentLoc.lat;
		dbLoc.lng      = currentLoc.lng;
		dbLoc.tripDest = currentTripDest;
		dbLoc.tripDestName = currentTripDestName;

		dbLoc.save(function (err) {
			if (err) { return; }
			dbLocCounter++;
		});
	},

	getMori: function(){
		var mori = {
			lat: currentLoc.lat,
			lng: currentLoc.lng,
			tripDestName : currentTripDestName,
			tripdest: currentTripDest,
			stepdest: currentStepDest
		}
		return mori;
	}
}