// Import modules
// I tried to use MVC architecture for easier readability and to display separation of concern (modularity)
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db.js');
const { Note, User } = require('./models/index.js')
const { noteController, userController } = require('./controllers/index.js');

// Import routes
// const homeRoute = require('./routes/home.js');
const noteRoutes = require('./routes/noteRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Create an Express app
const app = express();

// Connect to the database
connectDB();

// Note: Express has implemented functionality of body-parser 
// therefore I will use the express.json() and express.urlencoded() methods 
// to handle the respective request types
// Middleware - Handle JSON requests 
app.use(express.json());
// Middleware - Handle urlencoded requests 
app.use(express.urlencoded({ extended: true }));
// Middleware - Serve static pages from 'static' directory
app.use(express.static(path.join(__dirname, '../static')));
// Middleware - CORS handling
app.use(cors());

// Route for homepage
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// Routes for app
// app.use('/', homeRoute);
app.use('/notes', noteRoutes);
app.use('/users', userRoutes);

/* 
// Testing sub-documents
// POST /notes
app.post('/notes', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });
    const newUser = await user.save()
    req.body.author = newUser._id;
    const note = new Note(req.body);
    try {
        await note.save();
        res.status(201).json(note); // status 201 for successful creation
    }
    catch(err) {
        res.status(500).send(`Error saving note: ${err.message}`);
    }
});
*/

// Export the app
module.exports = app;