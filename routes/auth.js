const app = require("express");
const router = app.Router();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const activeUser = await User.findOne({
      username: username.toLowerCase(),
      password: password,
    });
    if (activeUser) {
      res.status(200).send("Login Successfully!," + activeUser.username);
    } else {
      res.status(401).send("Authentication Failed!");
    }
  } catch (error) {
    res.status(500).send("Server unable to login!");
  }
});

router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const existingUser = await User.findOne({ username: username });

  if (!existingUser) {
    try {
      const newUser = new User({
        username: username.toLowerCase(),
        password: password,
        confirmPassword: confirmPassword,
      });
      
       if (password == confirmPassword) {
            await newUser.save();
            console.log(confirmPassword , password)
             res.status(200).send("Registered, " + newUser.username);
       } else {
          res.status(400).send("Passwords do not match");
         
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error registering user");
    }
  } else {
    res.status(400).send("Username already exists");
  }
});

router.put("/change-password", async (req, res) => {
  const { username, newPassword, oldPassword } = req.body;
  try {
    const user = await User.findOne({
      username: username.toLowerCase(),
      password: oldPassword,
    });
    if (!user) {
      return res.status(401).send("User not found");
    } else {
      user.password = newPassword;
      await user.save();
      res.status(200).send("Password changed successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error changing password");
  }
});

module.exports = router;
