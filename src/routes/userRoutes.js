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
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:userId', userController.updateUserById);
router.delete('/:userId', userController.deleteUserById);

// Sub-document routes
router.get('/:userId/notes', userController.getNotes);
router.post('/:userId/notes', userController.createNote);
router.patch('/:userId/notes/:noteId', userController.updateNote);
router.delete('/:userId/notes/:noteId', userController.deleteNote);

module.exports = router;