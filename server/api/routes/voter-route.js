const express = require('express');
const VoterService = require('../services/voter-service');
const passport = require('passport');
const { sendInitialMail, sendVoteConfirmationMail } = require('../../modules/nodemailer');

const VoterServiceInstance = new VoterService;

const voterRouter = express.Router();

//get all voters
voterRouter.get('/', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.getAllVoters();
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//get all voters by election id
voterRouter.get('/election/:electionId',passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.getAllVotersByElectionId(req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//get single voter by id 
voterRouter.get('/:voterId', passport.authenticate('jwt-voter', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.getVoterById(req.params.voterId);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//add a voter
voterRouter.post('/add', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.addVoter(req.body);
        const emailData = await VoterServiceInstance.getVoterById(response.id);
        if (response && emailData) sendInitialMail(emailData);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//amend a voter by id
voterRouter.put('/amend/:voterId', passport.authenticate('jwt-voter', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.amendVoter(req.params.voterId, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//place a vote
voterRouter.post('/vote/:voterId/:candidateId', passport.authenticate('jwt-voter', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.placeVote(req.params.voterId, req.params.candidateId);
        if (response.success) sendVoteConfirmationMail(response.data);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//delete a voter by id
voterRouter.delete('/delete/:voterId', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.deleteVoter(req.params.voterId);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = voterRouter;