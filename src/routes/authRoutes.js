// auth routes file
// store the routes api here

const express = require('express');
const passportJwt = require('../config/passportConfig.js');
const authController = require('../controllers/authController.js');
const router = express.Router();

// Handle login
router.post('/login', authController.login);
router.get('/profile', authController.authenticate, (req, res) => {
    res.json({message:`Succesfully logged in`, user:req.user});
});

//TODO: implement protected area

module.exports = router;