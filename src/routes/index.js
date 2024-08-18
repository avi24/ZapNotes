// Consolidate all routes on this index page

// Import modules
const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const noteRoutes = require('./noteRoutes');

// Add the individual routes to the router
router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

// Export for use in the app
module.exports = router;