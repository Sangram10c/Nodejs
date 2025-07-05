const express = require('express');
const app = express();
const User = require('../Model/data');

// Add middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // set extended to false for simpler parsing

const path = require('path');


async function getAllUsers(req, res) {
    const allusers = await User.find({});
    const html =
        `<ul>
        ${allusers.map((user) =>
            `<li>${user.first_name} ${user.last_name} :  ${user.Job_title}</li>`
        ).join('')}
        </ul>`;
    // return res.send(JSON.stringify(allusers));
    // return res.render('User', { users: allusers });
    return res.render('UserList', { users: allusers });

}

async function getUserById(req, res) {
    const users = await User.findById(req.params.id);
    if (!users) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.json(users);
}
async function getUserByName(req, res) {
    const name = req.query.search || req.query.name; // Use 'search' or 'name' query parameter
    if (!name) {
        return res.status(400).json({ error: "Name query parameter is required" });
    }
    // Search by first_name or last_name (case-insensitive)
    const users = await User.find({
        $or: [
            { first_name: { $regex: name, $options: 'i' } }
        ]
    });
    if (!users.length) {
        return res.status(404).json({ error: "No users found with that name" });
    }
    return res.render('FindUser', { users });
}

async function createUser(req, res) {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.Job_title || !body.email || !body.gender || !body.password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        Job_title: body.Job_title,
        email: body.email,
        gender: body.gender,
        password: body.password
    });
    // return res.status(201).json({ status: "User Created Successfully", });
    return res.render('CreateUser', { status: "User Created Successfully" });
}
async function LoginUser(req, res) {
    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email: body.email, password: body.password });
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    return res.json({ status: "Login successful", user });
    // return res.render('Login', { status: "Login successful", user: user });
}   

async function deleteUser(req, res) {
    const body = req.body;
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "User Delete Success", id: req.params.id });
}

async function updateUser(req, res) {
    try {
        const updateuser = await User.findByIdAndUpdate(req.params.id, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            Job_title: req.body.Job_title
        },
            { new: true, runValidators: true });
        if (!updateuser) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ status: "User Data Updated", data: updateuser });
    } catch (error) {
        return res.status(500).json({ error: "Invalid ID ", details: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    getUserByName,
    LoginUser
};