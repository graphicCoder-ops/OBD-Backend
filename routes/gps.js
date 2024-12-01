const app = require("express");
const router = app.Router();

const GPS = require("../models/gps");

router.get("/get/:username", async (req, res) => {
    try {
      const user = await GPS.findOne({ username: req.params.username });
      if (user) {
        res.status(200);
        res.json(user);
      } else {
        res.status(401).send("Username Doesnt Exist!!!");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error getting DTC Codes!");
    }
  });

  router.post("/set", async (req, res) => {
    const { username, Latitude, Longitude} = req.body;
  
    const user = await GPS.findOne({ username: username });
    // if user exists update
    if (user) {
      try {
        user.Latitude = req.body.Latitude;
        user.Longitude = req.body.Longitude;
        await user.save();
        res.sendStatus(200);
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Error adding GPS");
      }
    } // if not then this
    else {
      const newUser = new GPS({ username: username, Latitude: Latitude,  Longitude: Longitude});
      await newUser.save();
      res.status(200).send("Added new DTC codes");
    }
  });

  module.exports = router;