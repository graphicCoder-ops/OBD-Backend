const app = require("express");
const router = app.Router();

router.post('/login',(req,res)=>{
    let username = req.body.username;
    let password =  req.body.password;
    res.send("Welcome "+username);
});

module.exports = router;
