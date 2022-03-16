const express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const authRouter = express.Router();

const isProduction = process.env.NODE_ENV === 'production';

authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return res.status(500).json(info.message)
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            election_id: user.election_id || null
        }
        const options = {
            subject: `${user.id}`,
            expiresIn: 3600
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);

        res.cookie('jwt-votingApp', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            sameSite: isProduction ? 'none' : 'lax',
            secure: isProduction ? true : false,
        })
        
        res.json(user);

    })(req, res, next);
})

authRouter.post('/logout', (req, res, next) => {
    res.clearCookie('jwt-votingApp');
    return res.status(200).send();
})


module.exports = authRouter;