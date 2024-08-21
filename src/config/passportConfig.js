// Passport config file
// I decided on using stateless authentication for ease of use and to learn for scalable solutions
// Plan is to use Local strategy for session-based for a future project to learn that, too

const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/userSchema');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
}

passport.use(new Strategy(options, async (payload, done) => {
    try{
        // console.log(`Strategy: creating the user...`);
        const user = await User.findById(payload.id);
        // console.log(`User: ${user}`);
        if(!user) {
            return done(null, false, { message: 'User not found' });
        }
        return done(null, user);
    } catch {
        return (`Strategy: ${err.message}`);
    }
}));

module.exports = passport;