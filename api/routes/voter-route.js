const express = require('express');
const VoterService = require('../services/voter-service');
const passport = require('passport');
const { sendInitialMail, sendVoteConfirmationMail } = require('../../modules/nodemailer');

const VoterServiceInstance = new VoterService;

const voterRouter = express.Router();

//get all voters for admin (admin may have more than one election)
voterRouter.get('/admin/:id', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.getAllVotersAdmin(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//get all voters by election id
voterRouter.get('/election/:electionId',passport.authenticate('jwt-election', { session: false }), async (req, res, next) => {
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
        const emailData = await VoterServiceInstance.getVoterData(response.id, req.body.election_id);
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

// check if voter has voted
voterRouter.get('/has_voted/:voterId/:electionId', passport.authenticate('jwt-voter', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.getHasVoted(req.params.voterId, req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//delete a voter by id
voterRouter.delete('/delete/:voterId/:electionId', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.deleteVoter(req.params.voterId, req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = voterRouter;