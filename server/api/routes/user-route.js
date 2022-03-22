const express = require('express');
const UserService = require('../services/user-service');
const passport = require('passport');

const UserServiceInstance = new UserService;

const userRouter = express.Router();

// get any user by id
userRouter.get('/:userId/:role', passport.authenticate('jwt-all-users', { session: false }), async (req, res, next) => {
    try {
        const response = await UserServiceInstance.getUserById(req.params.userId, req.params.role);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//amend any user by id
userRouter.put('/amend/:userId/:role', passport.authenticate('jwt-all-users', { session: false }), async (req, res, next) => {
    try {
        const response = await UserServiceInstance.amendUser(req.params.userId, req.params.role, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

// change user password - confirming current one matches
userRouter.put('/amend/password/:userId/:role', passport.authenticate('jwt-all-users', { session: false }), async (req, res, next) => {
    try {
        const response = await UserServiceInstance.amendUserPassword(req.params.userId, req.params.role, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

module.exports = userRouter;