const express = require('express');
const CandidateService = require('../services/candidate-service');
const passport = require('passport');
const { sendInitialMail } = require('../../modules/nodemailer');

const CandidateServiceInstance = new CandidateService;

const candidateRouter = express.Router();

//get all candidates
candidateRouter.get('/', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.getAllCandidates();
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//get all candidates by election id - users only have access to candidates in the election they are registered in
candidateRouter.get('/election/:electionId', passport.authenticate('jwt-election', { session: false }), async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.getAllCandidatesByElectionId(req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//get single candidate by id - users only have access to candidates in the election they are registered in
candidateRouter.get('/:candidateId/:electionId', passport.authenticate('jwt-election', { session: false }), async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.getCandidateById(req.params.candidateId, req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//add a candidate
candidateRouter.post('/add', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.addCandidate(req.body);
        const emailData = await CandidateServiceInstance.getCandidateById(response.id, response.election_id);
        if (response && emailData) sendInitialMail(emailData);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//amend a candidate by id
candidateRouter.put('/amend/:candidateId', passport.authenticate('jwt-candidate', { session: false }), async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.amendCandidate(req.params.candidateId, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//delete a candidate by id
candidateRouter.delete('/delete/:candidateId', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.deleteCandidate(req.params.candidateId);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = candidateRouter;

