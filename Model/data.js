const { timeStamp } = require('console');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    Job_title: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.set('timestamps', true);// Automatically adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema);

module.exports = User;
