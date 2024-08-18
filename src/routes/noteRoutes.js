// routes/noteRoutes.js

// Separation of concern: this file handles the routing for all the endpoints concerning Notes

// Import modules
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController.js');

// Debugging line
// console.log(noteController);

// Define the routes and link them to the controller methods
router.get('/', noteController.getAllNotes);
router.post('/', noteController.createNote);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;