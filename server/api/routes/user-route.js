const express = require('express');
const UserService = require('../services/voter-service');
const passport = require('passport');

const UserServiceInstance = new UserService;

const userRouter = express.Router();

//amend any user by id
userRouter.put('/amend/:userId/:role', passport.authenticate('jwt-voter', { session: false }), async (req, res, next) => {
    try {
        const response = await UserServiceInstance.amendUser(req.params.voterId, req.paramas.role, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

module.exports = userRouter;