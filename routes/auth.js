const app = require("express");
const router = app.Router();

router.post('/login',(req,res)=>{
    let username = req.body.username;
    let password =  req.body.password;
    res.send("Welcome back, "+username);
});

router.post('/register',(req,res)=>{
    let username = req.body.username;
    let password =  req.body.password;
    res.send("Registered "+username);
});
module.exports = router;
