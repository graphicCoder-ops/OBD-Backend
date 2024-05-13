const app = require("express");
const router = app.Router();
const User =  require('../models/user');

router.post('/login',(req,res)=>{
    let username = req.body.username;
    let password =  req.body.password;
    res.send("Welcome back, "+username);
});

router.post('/register',async (req,res)=>{
    const existingUser = await User.findOne({username:req.body.username});
    
    if(!existingUser){
    try {
        const newUser = new User({username:req.body.username,password:req.body.password});
        await newUser.save();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
}else{
    res.status(400).send('Username already exists');
}
    res.send("Registered "+req.body.username);
});

module.exports = router;
