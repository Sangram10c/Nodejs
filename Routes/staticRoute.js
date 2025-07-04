const express = require('express');
const router = express.Router();
const User = require('../Model/data');


router.get('/', (req, res) => {
    res.render("CreateUser", { status: "Welcome to User Creation Page" });
});
router.get('/User', async (req, res) => {
    const allusers = await User.find({});
    res.render("UserList", { users: allusers });
});
router.get('/CreateUser', (req, res) => {
    res.render("CreateUser", { status: "User Created Successfully" });
});

router.get('/FindUser', async (req, res) => {
    const allusers = await User.find({});
    res.render("FindUser", { users: allusers });
});
module.exports = router;