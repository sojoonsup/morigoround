var newrelic = require('newrelic');
var express  = require('express');
var mongoose = require('mongoose');
var port     = process.env.PORT || 8000;
var app      = express();
var server   = require('http').Server(app);
var navigation   = require('./navigation.js');


app.use(express.static(__dirname + '/../public')); // sets the static files location to public

mongoose.connect(process.env.MONGOLAB_URI);




// Listen
server.listen(port, function(){
	console.log('listening to ' + port);

	navigation.init();
});

app.get('/getLocation', function(req, res){

    res.send( navigation.getMori() );
});


