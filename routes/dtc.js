const app = require("express");
const UserDTC = require("../models/dtc");
const router = app.Router();


router.get('/get', async (req, res) => {
    const user = UserDTC.findOne(); 
    res.json(user.DTCs);
});

router.ws('/ws', async (ws, res) => {
    ws.on('DTCs', msg => {
        console.log(msg)
    });

    // test with client python script
});

router.post('/set', async (req, res) => {
    // if user exists update
    const user = UserDTC.findOne(); 
    user.DTCs = req.body.DTCs;
    await user.save();
    // if not then this
    const userDTC = new UserDTC(req.body);
    try {
        await userDTC.save();
    } catch (error) {
        
    }
    res.send("Function not implemented");
});

module.exports = router;