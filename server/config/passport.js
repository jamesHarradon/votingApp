const passport = require('passport');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
//const bcrypt = require('bcrypt');
const AuthModel = require('../api/models/auth-model');
const AuthModelInstance = new AuthModel;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET; 

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},async (email, password, done) => {
    let user;
    try {
        user = await AuthModelInstance.findOne(email);
        if(!user) {
            return done(null, false, {message: 'Incorrect email or password'});
        }
    } catch (error) {
        done(error)
    }

    // add password decrypt match function here for production - see documentation
    // something like let match = await user.comparePassword(password)
    if (password !== user.password) {
        return done(null, false, {message: 'Incorrect email or password.'});
    }
    return done(null, user);  
}));


passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    let user;
    try {
        user = await AuthModelInstance.findById(jwtPayload.id, jwtPayload.role);
        if (!user) {
            return done(null, false);
        }
    } catch (error) {
        return done(error)
    }
        return done(null, user);
}));
