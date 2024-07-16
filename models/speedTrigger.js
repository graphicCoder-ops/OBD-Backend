const mongoose = require("mongoose");

const SpeedTriggerSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    username: {type: String, required: true},
    Latitude:{type: Number, required: true},
    Longitude:{type: Number, required: true},
    SPEED: {type: String, required:true},
    SPEED_LIMIT: {type: String, required:true},
    ROAD_NAME: {type: String, required:true}
});

module.exports = mongoose.model('SpeedTrigger', SpeedTriggerSchema);