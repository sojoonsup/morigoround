var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = function(mongoose){
    var LocSchema = new Schema({
        date:       {type: Number, required: true},
        lat:    {type: Number, required: true},
        lng:    {type: Number, required: true},
        tripDest:  {type: String, required: false},
        tripDestName:  {type: String, required: false}
    });

    // var DestinationSchema = Schema({
    //  address   : {type: String, required: true}
    // });

    var models = {
        DbLoc : mongoose.model('currentLocations', LocSchema)
    // ,DbDest = mongoose.model('destinations', DestinationSchema) 
    }

    return models;
}
