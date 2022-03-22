const express = require('express');
const ResultService = require('../services/result-service');
const passport = require('passport');
const { sendInitialMail, sendVoteConfirmationMail } = require('../../modules/nodemailer');

const ResultServiceInstance = new ResultService;

const resultRouter = express.Router();

//get results for all admin elections
resultRouter.get('/admin/:id', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await ResultServiceInstance.getResultsByAdmin(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})


//get voted for candidate by voter id
resultRouter.get('/voter/:id', passport.authenticate('jwt-voter', { session: false }), async (req, res, next) => {
    try {
        const response = await ResultServiceInstance.getVotedCandidateByVoter(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//get results of an election
resultRouter.get('/election/:electionId', passport.authenticate('jwt-election', { session: false }), async (req, res, next) => {
    try {
        const response = await ResultServiceInstance.getResults(req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error)
    }
})



module.exports = resultRouter;