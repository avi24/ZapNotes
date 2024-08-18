// routes/userRoutes.js

// Separation of concern: this file handles the routing for all the endpoints concerning Users

// Import modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Debugging line
// console.log(userController);

// Define the routes and link them to the controller methods
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;