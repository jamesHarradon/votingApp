const passport = require('passport');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
//const bcrypt = require('bcrypt');
const AuthModel = require('../api/models/auth-model');
const AuthModelInstance = new AuthModel;
const AuthService = require('../api/services/auth-service');
const AuthServiceInstance = new AuthService;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt-votingApp'];
    }
    return token;
};
const options = {};
options.jwtFromRequest = cookieExtractor;
options.secretOrKey = process.env.JWT_SECRET; 
options.passReqToCallback = true


passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
    let user;
    let userPassword;
    try {
        user = await AuthServiceInstance.getUser(email);
        if(!user) {
            return done(null, false, {message: 'Incorrect email or password'});
        }
        userPassword = await AuthModelInstance.getPassword(email, user.role);
    } catch (error) {
        done(error)
    }

    // add password decrypt match function here for production - see documentation
    // something like let match = await user.comparePassword(password)
    if (password !== userPassword) {
        return done(null, false, {message: 'Incorrect email or password.'});
    }
    // user attached to req object as req.user
    return done(null, user);  
}));

passport.use('jwt-all-users', new JwtStrategy(options, async (req, jwtPayload, done) => {
    let user;
    try {
        user = await AuthModelInstance.findById(jwtPayload.id, jwtPayload.role);
        if (!user) {
            return done(null, false);
        }
        // user attached to req object as req.user
        return done(null, user);

    } catch (error) {
        return done(error)
    } 
}));


passport.use('jwt-admin', new JwtStrategy(options, async (req, jwtPayload, done) => {
    req.jwtPayload = jwtPayload;
    let user;
    if (jwtPayload.role === 'admin') {
        try {
            user = await AuthModelInstance.findById(jwtPayload.id, jwtPayload.role);
            if (!user) {
                return done(null, false);
            }
            // user attached to req object as req.user
            return done(null, user);

        } catch (error) {
            return done(error)
        }
    } else {
        return done(null, false)
    } 
}));

passport.use('jwt-candidate', new JwtStrategy(options, async (req, jwtPayload, done) => {
    let user;
    if (jwtPayload.role === 'candidate' || jwtPayload.role === 'admin') {
        if (req.params.candidateId && parseInt(req.params.candidateId) !== jwtPayload.id && jwtPayload.role === 'candidate') return done(null, false);
        try {
            user = await AuthModelInstance.findById(jwtPayload.id, jwtPayload.role);
            if (!user) {
                return done(null, false);
            }

            return done(null, user);

        } catch (error) {
            return done(error)
        }
    } else {
        return done(null, false)
    } 
        
}));

passport.use('jwt-voter', new JwtStrategy(options, async (req, jwtPayload, done) => {
    let user;
    if (jwtPayload.role === 'voter' || jwtPayload.role === 'admin') {
        if (req.params.voterId && parseInt(req.params.voterId) !== jwtPayload.id && jwtPayload.role === 'voter') return done(null, false);
        try {
            user = await AuthModelInstance.findById(jwtPayload.id, jwtPayload.role);
            if (!user) {
                return done(null, false);
            }
            
            return done(null, user);

        } catch (error) {
            return done(error)
        }
    } else {
        return done(null, false)
    } 
}));

passport.use('jwt-election', new JwtStrategy(options, async (req, jwtPayload, done) => {
    let user;
    const electionIdMatch = jwtPayload.role === 'candidate' ? jwtPayload.election_id === parseInt(req.params.electionId) : jwtPayload.election_ids.includes(parseInt(req.params.electionId))
    if (electionIdMatch) {
        try {
            user = await AuthModelInstance.findById(jwtPayload.id, jwtPayload.role);
            if (!user) {
                return done(null, false);
            }
            
            return done(null, user);

        } catch (error) {
            return done(error)
        }
    } else {
        return done(null, false)
    } 
}));

