const mongoose = require('mongoose');

const tripSchema  = mongoose.Schema({
    username: { type: String, required: true },
    FuelConsumption: { type: Number},
    DistanceTravelled: { type: Number},
    CO2Emissions: { type: Number},
    From: {type: String},
    To: {type: String},
    Date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Trip',tripSchema);