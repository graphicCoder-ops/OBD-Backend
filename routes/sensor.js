const app = require("express");
const router = app.Router();
//const SensorData = require('../models/sensordata');

router.get('/getData',(req,res)=>{
    res.send("Function not implemented yet");
});

router.put('/updateData',(req,res)=>{
    res.send("Function not implemented yet");
});

router.post('/initialize',(req,res)=>{
    res.send("Function not implemented yet");
});


module.exports = router;