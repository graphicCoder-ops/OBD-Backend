const app = require("express");
const router = app.Router();
const Trip = require("../models/trip");
const CarInfo = require("../models/carInfo");
const carInfo = require("../models/carInfo");

router.post('/add', async (req,res)=>{
    try {
      const newTrip = await Trip(req.body);
      const savedTrip = await newTrip.save(); 
      res.status(200).json({ message: "Created new Trip", id: savedTrip._id }); // Return the id in the response for Harsh
    } catch (error) {
      res.status(500).send("Couldn't create data : error stacktrace" + error);
    }
});

router.get('/getStats/:username', async (req,res) => {
  try {
    const result = await Trip.aggregate([
      { $match: { username: req.params.username } }, // Filter by username
      {
        $group: {
          _id: {
            month: { $month: "$Date" },  // Group by month
            year: { $year: "$Date" }     // Group by year to avoid mixing months from different years
          },
          totalFuelConsumption: { $sum: "$FuelConsumption" }, // Sum FuelConsumption
          totalDistanceTravelled: { $sum: "$DistanceTravelled" } // Sum DistanceTravelled
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } } // Sort by year and month
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

router.get('/get/:username', async (req,res)=>{
  try {
    const trip = await Trip.find({
      username: req.params.username.toLowerCase()}).sort({ Date: -1 });;
    res.status(200).json(trip); // Return the id in the response for Harsh
  } catch (error) {
    res.status(500).send("Couldn't create data : error stacktrace" + error);
  }
});


router.put('/update/:id', async (req,res)=>{
    // if username doesnt exist create new entry
    let FuelConsumption = req.body.FuelConsumption;
    let DistanceTravelled =  req.body.DistanceTravelled;
    
    try {
      const updateTrip = await Trip.findById(req.params.id);
      const carInfo =  await CarInfo.findOne({username: updateTrip.username});
      FuelConsumption = FuelConsumption * carInfo.FUEL_CAPACITY;

      if (!updateTrip) {
        return res.status(401).send("Trip not Found");
      } else {
        updateTrip.FuelConsumption = FuelConsumption;
        updateTrip.DistanceTravelled = DistanceTravelled;
        await updateTrip.save();
        res.status(200).send("Updated!");
      }
    } catch (error) {
      res.status(500).send("Couldn't create data : error stacktrace" + error);
    }
});

module.exports = router;