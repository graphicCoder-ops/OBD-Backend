const app = require("express");
const router = app.Router();

//const SensorData = require('../models/sensordata');

router.get('/getData',(req,res)=>{
    // if user exists get data
    res.send("Function not implemented yet");
});


router.put('/updateData',(req,res)=>{
    // if username doesnt exist use user initialize
    // if username exists update all data
    res.send("Function not implemented yet");
});

router.post('/initialize',(req,res)=>{
    // if username doesnt exist create one with data
    res.send("Function not implemented yet");
});


module.exports = router;