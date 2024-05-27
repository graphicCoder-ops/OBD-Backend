const mongoose = require("mongoose");

const sensorSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    username: {type: String, required: true},
    rpm: { type: Number, required: false },
    speed: { type: Number, required: false },
    coolantTemp: { type: Number, required: false },
    throttlePos: { type: Number, required: false },
    intakeTemp: { type: Number, required: false },
    maf: { type: Number, required: false },
    runTime: { type: Number, required: false },
    fuelLevel: { type: Number, required: false },
    barometricPressure: { type: Number, required: false }
});

module.exports = mongoose.model('SensorData', sensorSchema);