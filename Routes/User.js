const express = require('express');
const router = express.Router();


const { getAllUsers, getUserById, updateUser, deleteUser, createUser } = require('../Controllers/User');
// Get all users
router.route('/api/users')
    .get(getAllUsers)
    .post(createUser);

router.route('/api/user/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;