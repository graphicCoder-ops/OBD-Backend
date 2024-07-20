const express = require("express");
const authservice =require("./routes/auth.js");
const pidservice = require("./routes/sensor.js");
const dtcservice = require("./routes/dtc.js");
const triggerservice =  require("./routes/speedTrigger.js");
const predictservice = require("./routes/predict.js");
// by default my mobile application is been blocked by this API
const cors =  require('cors');
const dotenv =require("dotenv");
const mongoose= require("mongoose");

const app = express();


// Enable All CORS Requests
app.use(cors());

// importing environment variables this is merely for simulating or virtual env
dotenv.config();

//db connection
mongoose.connect(process.env.DB_CONNECTION_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// by default express uses xml weird am i right??
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Landing page works!")
});

app.use('/auth',authservice);

app.use('/sensor',pidservice);

app.use('/dtc',dtcservice);

app.use('/speed-trigger',triggerservice);

app.use('/predict',predictservice);

// Starting server at port 6969
app.listen(process.env.PORT,()=>{
    console.log("Server is listening at http://localhost:" + process.env.PORT);
});
