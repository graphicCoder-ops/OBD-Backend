const mongoose = require('mongoose');

const dtcSchema  = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    DTCs: { type: Array, required: true }
});

module.exports = mongoose.model('UserDTC',dtcSchema);