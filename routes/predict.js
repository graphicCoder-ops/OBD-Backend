const app = require("express");
const { spawn } = require('child_process');
const router = app.Router();


router.post("/co2-emission", (req, res) => {

    const engineSize = req.body.engineSize;
    const cylinders = req.body.cylinders;
    const combined = req.body.combined;
    const transmission = req.body.transmission;
    const fuelType = req.body.fuelType;

    const python = spawn('python', ['python/main.py', engineSize, cylinders, combined, transmission, fuelType]);

    python.stdout.on('data', (data) => {
        res.write(data);
    });

    // Handle script errors
    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send(data.toString());
    });

    python.on('close', (code) => {
        res.end();
    });

});


module.exports = router;