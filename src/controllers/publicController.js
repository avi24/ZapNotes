// home controller to handle index logic

// include necessary libraries/modules
const User = require('../models/userSchema.js');

// login user
const checkUser = async (req, res) => {
    console.log("checkUser controller entered...");
    console.log(`User in the checkUser controller: ${req.user}`);
    if(req.user) {
        console.log("Decoded user:", JSON.stringify(req.user, null, 2));  // Convert object to string for readability
        const user = await User.findById(req.user.id);
        console.log(user);
        if(user.notes) {
            res.render('dashboard', { user, notes:user.notes })
        } else {
            res.render('dashboard', { user })
        }
        
        // res.redirect('/');
    } else {
        console.log('No user found, rendering index file');
        res.render('index');
    }        
}

const showProfile = async (req, res) => {
    if(true) {
        const user = await User.findById('66c25f240a8a26a066e8b608');
        res.render('profile', { user, notes:user.notes })
    } else {
        res.render('index');
    }
}

module.exports = {
    checkUser,
    showProfile,
};