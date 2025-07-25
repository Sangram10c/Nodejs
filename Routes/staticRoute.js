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

router.get('/Login', (req, res) => {
    res.render("Login", { status: "Welcome to Login Page" });
});
router.get('/upload', (req, res) => {
    res.render("FileUpload", { status: "Welcome to File Upload Page" });
});
module.exports = router;