// public routes file
// all of these routes can be accessed without authentication

const express = require('express');
const publicController = require('../controllers/publicController.js');
const checkAuthentication = require('../middleware/authentication.js');
const router = express.Router();

// Handle login
router.get('/', checkAuthentication, publicController.checkUser);
router.post('/', checkAuthentication, publicController.checkUser);
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/dashboard', checkAuthentication, (req, res) => {
    console.log('Rendering /dashboard');
    console.log(req.user);
    res.render('dashboard', { user:req.user, notes:req.user.notes });
});

router.get('/profile', publicController.showProfile);

//TODO: implement protected area

module.exports = router;