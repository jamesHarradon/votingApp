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
        }

        const election = user.role === 'candidate' ? { election_id: user.election_id } : { election_ids: user.election_ids } ;

        const options = {
            subject: `${user.id}`,
            expiresIn: 3600
        }
        const token = jwt.sign({...payload, ...election}, process.env.JWT_SECRET, options);

        res.cookie('jwt-votingApp', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            sameSite: isProduction ? 'none' : 'lax',
            secure: isProduction ? true : false,
        })
        
        res.json(user);

    })(req, res, next);
})

//edits cookie when admin adds/removes election. This is necessary for authorisation to see newly created elections.
authRouter.put('/edit-cookie/:action/:electionId', passport.authenticate('jwt-admin', { session: false }), (req, res, next) => {

    if(req.params.action === 'add') {
        req.jwtPayload.election_ids.push(parseInt(req.params.electionId))
    }

    if(req.params.action === 'remove') {
        req.jwtPayload.election_ids = req.jwtPayload.election_ids.filter(id => id !== parseInt(req.params.electionId))
    }

    const payload = {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
        election_ids: req.jwtPayload.election_ids
    }

    const options = {
        subject: `${req.user.id}`,
        expiresIn: 3600
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    res.cookie('jwt-votingApp', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction ? true : false,
    })
    
    res.json({...payload, first_name: req.user.first_name, last_name: req.user.last_name});
})

authRouter.post('/logout', (req, res, next) => {
    res.clearCookie('jwt-votingApp');
    return res.status(200).send();
})


module.exports = authRouter;