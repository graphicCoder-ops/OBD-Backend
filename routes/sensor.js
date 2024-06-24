const app = require("express");
const sensordata = require("../models/sensordata");
const router = app.Router();

//const SensorData = require('../models/sensordata');

router.get("/get/:username", async (req, res) => {
    try {
      const sensors = await sensordata.findOne({ username: req.params.username });
      if (sensors) {
        res.status(200);
        res.json(sensors);
      } else {
        res.status(401).send("Username Doesnt Exist!!!");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error getting sensors data");
    }
  });


router.post('/set', async (req,res)=>{
    
    // if username exists update all data
    const user = await sensordata.findOne({username: req.body.username});
    if(user){
        try {
            for(let command in req.body){
              user[command] = req.body[command];
            }
            user.save();
            res.status(200).send("Updated!");
        } catch (error) {
            res.status(500).send("Couldn't update data");
        }
    }else{
      // if username doesnt exist create new entry
      try {
        const sensor = await sensordata(req.body);
        sensor.save();
        res.status(200).send("Created new Entry!");
      } catch (error) {
        res.statu(500).send("Couldn't create data");
      }
        
        
    }
});

module.exports = router;