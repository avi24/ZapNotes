const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema.js');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });

            // Validate user and password data
            // TODO: implement verifyPassword method in model
            // if (!user || !user.verifyPassword(password)) {
            if (!user || user.password !== password) {
                return done(null, false, { message: 'Incorrect credentials.' });
            }
            
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const user = await User.findById(userId);
        done(null, user);
    } catch (err) {
        done(err);
    }
});  

module.exports = passport;