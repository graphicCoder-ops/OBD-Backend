const app = require("express");
const UserDTC = require("../models/dtc");
const router = app.Router();

router.get("/get", async (req, res) => {
  try {
    const userdtc = await UserDTC.findOne({ username: req.body.username });
    if (userdtc) {
      res.status(200);
      res.json(userdtc);
    } else {
      res.status(401).send("Username Doesnt Exist!!!");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error getting DTC Codes!");
  }
});

/* 
router.ws('/ws', async (ws, res) => {
    ws.on('DTCs', msg => {
        console.log(msg)
    });

    // test with client python script
});
*/
router.post("/set", async (req, res) => {
  const { username, DTCs } = req.body;

  const userdtc = await UserDTC.findOne({ username: username });
  // if user exists update
  if (userdtc) {
    try {
      userdtc.DTCs = req.body.DTCs;
      await userdtc.save();
      res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Error adding DTC Codes!");
    }
  } // if not then this
  else {
    const newDtc = new UserDTC({ username: username, DTCs: DTCs });
    await newDtc.save();
    res.status(200).send("Added new DTC codes");
  }
});

module.exports = router;
