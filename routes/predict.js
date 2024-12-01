const app = require("express");
const { spawn } = require('child_process');
const router = app.Router();
// Import necessary models
const Trip = require('../models/trip'); 
const CarInfo = require('../models/carInfo'); 


const predictEmissions = (data) => {
    return new Promise((resolve, reject) => {
        const engineSize = data.engineSize;
        const cylinders = data.cylinders;
        const combined = data.combined;
        const transmission = data.transmission;
        const fuelType = data.fuelType;

        const python = spawn('python', ['python/main.py', engineSize, cylinders, combined, transmission.toUpperCase(), fuelType]);

        let output = '';

        // Collect data from stdout
        python.stdout.on('data', (data) => {
            output += data.toString();
        });

        // Handle script errors
        python.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data.toString());
        });

        python.on('close', (code) => {
            if (code === 0) {
                resolve(parseFloat(output.trim()));
            } else {
                reject(`Python script closed with code ${code}`);
            }
        });
    });
};


router.post('/update-co2-emission', async (req, res) => {
    try {
        const username = req.body.username;

        // Find all trips for the user with missing CO2 emission data
        const tripsToUpdate = await Trip.find({
            username: username,
            CO2Emissions: { $exists: false }
        });
        
        if (!tripsToUpdate.length) {
            return res.status(200).json({ message: "No trips to update." });
        }

        // Find user's car information (or you can use the info from req.body)
        const carInfo = await CarInfo.findOne({ username: username });

        if (!carInfo) {
            return res.status(404).json({ message: "Car information not found." });
        }

        // Loop through each trip that needs updating
        for (let trip of tripsToUpdate) {
            const requestBody = {
                engineSize: carInfo.ENGINE_SIZE,
                cylinders: carInfo.Cylinders,
                combined: (trip.FuelConsumption/(trip.DistanceTravelled/100)), // assuming this is combined fuel consumption
                transmission: carInfo.Transmission,
                fuelType: carInfo.FUEL_TYPE
            };

            console.log(requestBody);

            // Call your existing CO2 emission prediction endpoint
            const co2Emissions = await predictEmissions(requestBody);
            console.log(co2Emissions);
            if (co2Emissions) {
                // Update trip with the predicted CO2 emissions
                trip.CO2Emissions = co2Emissions;
                await trip.save();
            }
        }

        res.status(200).json({ message: "CO2 emissions updated for trips." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});


module.exports = router;