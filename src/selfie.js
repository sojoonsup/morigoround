var fs = require('fs');
var webshot = require('webshot');
var path = require('path');
var tweet = require('./tweet.js');



function getDateTime() {
	var date = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;

	var sec  = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;

	var year = date.getFullYear();

	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;

	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	return year + "_" + month + "_" + day + "_" + hour + "_" + min + "_" + sec;
}


var url = 'http://www.morigoround.com/selfie/selfie.html';

module.exports = {

	takeSelfie: function(tweetContent){
		var filename = 'selfie-' + getDateTime() + '.png';

		webshot('http://www.morigoround.com/selfie/selfie.html', 
				filename, 
				{
					windowSize  : {
						width: 800,
						height: 540
					},
					phantomPath : path.join(__dirname, 'vendor/phantomjs/bin/phantomjs'),
					renderDelay : 20000
					// takeShotOnCallback:	true    
							// Wait for the web page to signal to webshot when to take the photo using 
							// window.callPhantom('takeShot');
				}, 
				function(err){
					if(err){console.log(err);}

					console.log('===============');
				    console.log('captured '+ filename);

					tweet.postSelfie(tweetContent);
		});
	}
}

