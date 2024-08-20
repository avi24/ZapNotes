const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/userSchema');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,

}

passport.use(new LocalStrategy(options, async (payload, done) => {
    try{
        const user = await User.findById(payload.id);
        if(!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch {
        return (err.message);
    }
        
}));

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