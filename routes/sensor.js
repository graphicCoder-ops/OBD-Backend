const app = require("express");
const sensordata = require("../models/sensordata");
const router = app.Router();

//const SensorData = require('../models/sensordata');

router.get('/getData',(req,res)=>{
    // username  is exists
    res.send("Function not implemented yet");
});


router.put('/updateData',(req,res)=>{
    // if username doesnt exist create new entry
    // if username exists update all data
    res.send("Function not implemented yet");
});

module.exports = router;