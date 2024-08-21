// Import modules
// I tried to use MVC architecture for readability and separation of concern (modularity)
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
// const axios = require('axios');
require('dotenv').config();
const connectDB = require('./config/db.js');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('./auth/passport.js');
const passportJwt = require('./auth/passport-jwt.js');
const jwt = require('jsonwebtoken');
const errorHandler = require('./middleware/errorHandler.js');
const User = require('./models/userSchema.js');

// Import routes
// const homeRoute = require('./routes/home.js');
// const noteRoutes = require('./routes/noteRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const { ExtractJwt } = require('passport-jwt');

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
// Auth - Authenticate users
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passportJwt.initialize());
app.use(passportJwt.session());

// Express Static middleware to serve pages from my static directory
// app.use(express.static('static'));
// app.use(express.static(__dirname + 'static'));
// Routes Handlers
// Route for homepage
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });
// app.use('/', homeRoute);
// app.use('/notes', noteRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    if(!req.isAuthenticated) {
        res.redirect('/');
        res.send("<h1>Home</h1><a href='/login'>Login</a>");
    } else {
        res.send(`<h1>Welcome ${req.user.username}</h1><a href='/logout'>Logout</a>`);
    }
});

app.get('/profile', passportJwt.authenticate('jwt'), (req, res) => {
    res.json({message:`Succesfully logged in`, user:req.user});
});



app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // since password is set to select:false in the Schema, use .select() chaining to override
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        // console.log(`User.password: ${user.password}, Password:${password}`);

        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
        // if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const accessToken = jwt.sign(
            {id: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'}
        );

        res.json({ accessToken });
    } catch (err) {
        res.status(500).json({message:`Could not log in: ${err.message}`});

    }
    // res.send(__dirname + 'login.html');
})

app.post('/login', passport.authenticate('local',
    {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
    }
));

app.get('/logout', (req,res) => {
    req.logout((err) => {
        if(err) { throw err; }
        res.redirect('/login');
    })
});

app.post('/signup', async (req, res) => {
        const { name, username, email, password } = req.body;
    try {
        const newUser = User.create({
            name,
            email,
            username,
            password
        });

        res.status(201).json({
            message: 'User created successfully',
            user: `${newUser}`
        });

    } catch (err) {
        res.status(500).json({
            message: 'Error creating user',
            error: err.message
        });
    }
});

// Error handling middleware (placed at bottom of stack to act as final catch-all)
app.use(errorHandler);

// Export the app
module.exports = app;