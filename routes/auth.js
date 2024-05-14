const app = require("express");
const router = app.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
    try {
        const activeUser = await User.findOne({ username: req.body.username, password: req.body.password });
        if (activeUser) {
            res.status(200).send("Login Successfully!," + activeUser.username);
        } else {
            res.status(401).send("Authentication Failed!");
        }
    } catch (error) {
        res.status(500).send("Server unable to login!");
    }
});

router.post('/register', async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username });

    if (!existingUser) {
        try {
            const newUser = new User({ username: req.body.username, password: req.body.password });
            await newUser.save();
            res.status(200).send('Registered, '+ newUser.username);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error registering user');
        }
    } else {
        res.status(400).send('Username already exists');
    }
});

module.exports = router;
