const express = require("express");
const authservice =require("./routes/auth.js");
const app = express();
const dotenv =require("dotenv");
const mongoose= require("mongoose");

// importing environment variables this is merely for simulating or virtual env
dotenv.config();

//db connection
mongoose.connect(process.env.DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));




// by default express uses xml weird am i right??
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Landing page works!")
});

app.use('/auth',authservice);

// Starting server at port 6969
app.listen(process.env.PORT,()=>{
    console.log("Server is listening at http://localhost:6969")
});