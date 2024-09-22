// routes/userRoutes.js

// Separation of concern: this file handles the routing for all the endpoints concerning Users

// Import modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Debugging line
// console.log(userController);

// Define the routes and link them to the controller methods
router.get('/users', userController.getAllUsers);
router.get('/user/:userId', userController.getUserById);
router.post('/signup', userController.createUser);
router.patch('/user/:userId', userController.updateUserById);
router.delete('/user/:userId', userController.deleteUserById);

// Sub-document routes
router.get('/user/:userId/notes', userController.getNotes);
router.post('/user/:userId/note', userController.createNote);
router.patch('/user/:userId/note/:noteId', userController.updateNote);
router.delete('/user/:userId/note/:noteId', userController.deleteNote);

module.exports = router;