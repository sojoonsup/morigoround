var Twitter = require('twitter');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var dir = './../';

function getMostRecentFileName() {
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function (f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}

module.exports = {
	postStatus: function(content){
		client.post('statuses/update', {status: content},  function(error, tweet, response) {
		  if(error) throw error;
		});
	},

	postSelfie: function(statusContent){
		console.log('start tweet = ' + statusContent);
		var imgsrc = dir + getMostRecentFileName();

		var data = fs.readFileSync(imgsrc);
		
		client.post('media/upload', {media: data}, function(error, media, response) {
		if(error){
			console.log(error);
		}
		if (!error) {

			// If successful, a media object will be returned.
			console.log(media);

			// Lets tweet it
			var status = {
				status: statusContent,
				media_ids: media.media_id_string // Pass the media id string
			}

			client.post('statuses/update', status, function(error, tweet, response) {
				if (!error) {
					console.log(tweet);
				}
			});

			}
		});
	}
}