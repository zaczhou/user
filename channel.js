var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var channelSchema = new Schema({
  uid : { type: String },
  users : { type: Array }
});

mongoose.model('Channel', channelSchema);