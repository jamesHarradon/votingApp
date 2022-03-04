const express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const authRouter = express.Router();

authRouter.post('/login', function(req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return res.status(500).json(info.message)
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const options = {
            subject: `${user.id}`,
            expiresIn: 3600
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, options);
        
        res.json({token});

    })(req, res, next);
})


module.exports = authRouter;