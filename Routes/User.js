const express = require('express');
const router = express.Router();


const { getAllUsers, getUserById, updateUser, deleteUser, createUser, getUserByName } = require('../Controllers/User');
// Get all users
router.route('/api/users')
    .get(getAllUsers);
    
router.route('/api/createuser')    
    .post(createUser);

router.route('/api/user/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router.route('/api/user')
    .get(getUserByName);

module.exports = router;