const mongoose = require("mongoose");

const sensorSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    username: {type: String, required: true},
    RPM: { type: String, required: false },
    SPEED: { type: String, required: false },
    ENGINE_LOAD: { type: String, required: false },
    LONG_FUEL_TRIM_1: { type: String, required: false },
    O2_B1S1: { type: String, required: false },
    THROTTLE_POS: { type: String, required: false },
    COOLANT_POS: { type: String, required: false },
    MAF: { type: String, required: false },
    FUEL_LEVL: { type: String, required: false },
});

module.exports = mongoose.model('SensorData', sensorSchema);