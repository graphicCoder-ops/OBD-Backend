const app = require("express");
const SpeedTrigger = require("../models/speedTrigger");
const router = app.Router();

router.get('/get/:username', async (req,res)=>{
    try{
    const triggerValues = await SpeedTrigger.find({ username: req.params.username }).sort({ timestamp: -1 });
    if(triggerValues.length != 0 ){
        console.log(triggerValues);
        res.status(200).json(triggerValues);
    }else{
        res.status(404).send("Couldn't find data!");
    }
    }catch(error){
        res.status(500).send("Couldn't retrieve the values");
    }

});

router.post('/add', async (req,res)=>{
      // if username doesnt exist create new entry
      try {
        const triggerValues = await SpeedTrigger(req.body);
        triggerValues.save();
        res.status(200).send("Created new Entry!");
      } catch (error) {
        res.status(500).send("Couldn't create data");
      }
});

module.exports = router;