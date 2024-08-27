// auth controller to handle auth logic

// include necessary libraries/modules
const jwt = require('jsonwebtoken');
const passport = require('../config/passportConfig.js');
const User = require('../models/userSchema.js');

// login user
const login = async (req, res) => {
    try {
        console.log(`Req.body insde login method: ${req.body}`);
        const { email, password } = req.body;
        
        // since password is set to select:false in the Schema, use .select() chaining to override
        const user = await User.findOne({ email }).select('+password');
        console.log(`User insde login method: ${user}`);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // console.log(`User.password: ${user.password}, Password:${password}`);

        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
        // if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const accessToken = jwt.sign(
            {id: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'}
        );

        res.json({ accessToken });
    } catch (err) {
        res.status(500).json({message:`Could not log in: ${err.message}`});
    }
}

const authenticate = passport.authenticate('jwt', {
    session:false,
    failureRedirect: '/login',
    failureMessage: true,
});

module.exports = {
    login,
    authenticate
};