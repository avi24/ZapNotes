// Import modules
// I tried to use MVC architecture for readability and separation of concern (modularity)
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
// const axios = require('axios');
require('dotenv').config();
const connectDB = require('./config/dbConfig.js');
const passport = require('./config/passportConfig.js');
const errorHandler = require('./middleware/errorHandler.js');

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
// Auth - Authenticate users
app.use(passport.initialize());
// Static directory for static content (images, CSS, js, etc.)
app.use(express.static('assets'));

// Specify 'views/' directory and set the rendering engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Import routes
// const noteRoutes = require('./routes/noteRoutes.js');
const publicRoutes = require('./routes/publicRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

app.use('/', publicRoutes);
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

// define model for testing
const User = require('./models/userSchema.js');

/*
// TEST ROUTES
app.get('/', (req, res) => {
    if(!req.isAuthenticated) {
        res.redirect('/');
        // res.send("<h1>Home</h1><a href='/login'>Login</a>");
    } else {
        res.send(`<h1>Welcome ${req.user.username}</h1><a href='/logout'>Logout</a>`);
    }
});

app.get('/logout', (req,res) => {
        res.redirect('/login');
});
*/

// Error handling middleware (placed at bottom of stack to act as final catch-all)
app.use(errorHandler);

// Export the app
module.exports = app;