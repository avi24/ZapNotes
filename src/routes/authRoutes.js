// auth routes file
// store the routes api here

const express = require('express');
const passportJwt = require('../config/passportConfig.js');
const authController = require('../controllers/authController.js');
const checkAuthentication = require('../middleware/authentication.js');
const router = express.Router();

// Handle login
router.post('/login', authController.login);

router.post('/dashboard', checkAuthentication, (req, res) => {
    console.log('Rendering /dashboard');
    console.log(req.user);
    res.render('dashboard', { user:req.user, notes:req.user.notes });
});

//TODO: implement protected area

module.exports = router;