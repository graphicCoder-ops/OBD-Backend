const app = require("express");
const UserDTC = require("../models/dtc");
const router = app.Router();

router.get('/get', async (req, res) => {
    //const DTC = new UserDTC({username:"Shit",DTCs:['2302','3453','3457','3dc34']});
    await DTC.save();
    res.send("Function not implemented");
});

router.post('/set', (req, res) => {
    res.send("Function not implemented");
});

module.exports = router;