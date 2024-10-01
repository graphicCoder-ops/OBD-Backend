const mongoose = require('mongoose');

const pid_schema  = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    PRIORITY_COMMANDS: { 
        type: Array, 
        required: true, 
        default:['RPM', 'SPEED', 'ENGINE_LOAD', 'LONG_FUEL_TRIM_1', 'O2_B1S1', 'THROTTLE_POS', 'COOLANT_TEMP', 'MAF', 'FUEL_LEVEL']
    }
});

module.exports = mongoose.model('pid', pid_schema);