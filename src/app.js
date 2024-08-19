// Import modules
// I tried to use MVC architecture for readability and separation of concern (modularity)
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
// const axios = require('axios');
const connectDB = require('./config/db.js');
const errorHandler = require('./middleware/errorHandler.js');

// Import routes
// const homeRoute = require('./routes/home.js');
// const noteRoutes = require('./routes/noteRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Create an Express app
const app = express();

// Connect to the database (thru the config directory)
connectDB();

// Middlewares
// Order matters for how you place your middleware (ie. order of execution)
// Logging - use morgan
app.use(morgan('dev'));
// CORS - security feature to control domain access
app.use(cors());
// Body parsing - Handle JSON requests (Express now implements 'body-parser')
app.use(express.json());
// Body parsing - Handle urlencoded requests 
app.use(express.urlencoded({ extended: true }));
// Static file - Serve static pages from 'static' directory (ie. HTML, CSS)
app.use(express.static(path.join(__dirname, '../static')));
// Auth - Authenticate users making requests
// TODO: implement auth middleware

// Routes Handlers
// Route for homepage
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// app.use('/', homeRoute);
// app.use('/notes', noteRoutes);
app.use('/users', userRoutes);

// Error handling middleware (placed at bottom of stack to act as final catch-all)
app.use(errorHandler);

// Export the app
module.exports = app;