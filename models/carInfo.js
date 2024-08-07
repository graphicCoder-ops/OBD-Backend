const mongoose = require("mongoose");

const carInfoSchema = mongoose.Schema({
    username: {type: String, required: true},
    ENGINE_SIZE:{type: String },
    Cylinders:{type: String },
    Transmission: {type: String },
    VIN: {type: String },
    FUEL_TYPE: {type: String },
    CAR_YEAR: {type: String },
    CAR_MODEL: {type: String },
    CAR_COMPANY: {type: String },
});

module.exports = mongoose.model('CarInfo', carInfoSchema);