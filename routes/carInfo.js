const app = require("express");
const axios = require('axios');
const CarInfo = require("../models/carInfo");
const router = app.Router();
const dotenv = require("dotenv");

dotenv.config();



function fuelTypeConvert( FuelType){

  let convertedValue = NaN
  switch(FuelType) {
    case "Gasoline":
      convertedValue = "X"
      console.log(convertedValue)
      break;
      case "Premium Gasoline":
        convertedValue = "Z"
        console.log(convertedValue)
        break;
      case "Diesel":
        convertedValue = "D"
        console.log(convertedValue)
        break;
      case "E85":
         convertedValue = "E"
        break;
      case "Electricity":
        convertedValue = "B"
        break;
      case "Natural Gas":
        convertedValue = "N"
        break;
      default:
        convertedValue = "X"
      break;
  }
   return convertedValue;
}


//get car information from the username
router.get("/get/:username", async (req, res) => {
  try {
    const userCarInfo = await CarInfo.findOne({
      username: req.params.username,
    });
    if (userCarInfo) {
      res.status(200);
      res.json(userCarInfo);
    } else {
      res.status(401).send("Username Doesnt Exist!!!");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error getting Car info!");
  }
});

//check if username exists first if not create new then set the values
router.post("/set", async (req, res) => {
  const userCarInfo = await CarInfo.findOne({ username: req.body.username });
  // if user exists update
  if (userCarInfo) {
    try {
      for(let command in req.body){
        userCarInfo[command] = req.body[command];
      }
      
      userCarInfo.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error adding Car info!");
    }
  } else {
    try {
      const newInfo = new CarInfo(req.body);
      await newInfo.save();
      res.status(200).send("Added new Car Information!! ");
    } catch (error) {
      res.status(500).send("Couldn't add data");
    }
  }
});

router.put("/updateByVIN/:VIN", async (req, res) => {
  //get the VIN number from obd
  const VIN = req.params.VIN;
  try {
    //check if VIN number exists
    const userVin = await CarInfo.findOne({ VIN:VIN });
    //if not then create new entry and add the info
    if (!userVin) {
      const response = await axios.get(process.env.VIN_API + VIN + '?format=json');
      const carData = response.data;
      
      const newVinInfo = new CarInfo({
        username:req.body.username,
        ENGINE_SIZE:carData.Results.find(result => result.Variable === 'Displacement (L)').Value,
        Engine_Model:carData.Results.find(result => result.Variable === 'Engine Model').Value,
        Cylinders:carData.Results.find(result => result.Variable === 'Engine Number of Cylinders').Value,
        Transmission:carData.Results.find(result => result.Variable === 'Transmission Style').Value,
        VIN: VIN,
        //FUEL_TYPE: carData.Results.find(result => result.Variable === 'Fuel Type - Primary').Value,
        CAR_YEAR: carData.Results.find(result => result.Variable === 'Model Year').Value,
        CAR_MODEL: carData.Results.find(result => result.Variable === 'Model').Value,
        CAR_COMPANY:carData.Results.find(result => result.Variable === 'Make').Value,
        FUEL_TYPE:fuelTypeConvert(carData.Results.find(result => result.Variable === 'Fuel Type - Primary').Value)
      });
      await newVinInfo.save();
      return res.status(200).send("added new information");
      
    } else {
      //updating the info based on the VIN from obd
      const response = await axios.get(process.env.VIN_API + VIN + '?format=json');
      const carData = response.data;
      
      
       userVin.set({
        username:req.body.username,
        ENGINE_SIZE:carData.Results.find(result => result.Variable === 'Displacement (L)').Value,
        Engine_Model:carData.Results.find(result => result.Variable === 'Engine Model').Value,
        Cylinders:carData.Results.find(result => result.Variable === 'Engine Number of Cylinders').Value,
        Transmission:carData.Results.find(result => result.Variable === 'Transmission Style').Value,
        VIN: VIN,
        //FUEL_TYPE: carData.Results.find(result => result.Variable === 'Fuel Type - Primary').Value,
        CAR_YEAR: carData.Results.find(result => result.Variable === 'Model Year').Value,
        CAR_MODEL: carData.Results.find(result => result.Variable === 'Model').Value,
        CAR_COMPANY:carData.Results.find(result => result.Variable === 'Make').Value,
        FUEL_TYPE:fuelTypeConvert(carData.Results.find(result => result.Variable === 'Fuel Type - Primary').Value)
      });
      await userVin.save();
      return res.status(200).send("Updated existing information");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating info");
  }
 

});

module.exports = router;
