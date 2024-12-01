const mongoose = require("mongoose");

const GpsSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    Latitude:{type: Number, required: true},
    Longitude:{type: Number, required: true}
});

module.exports = mongoose.model('gps', GpsSchema);