const express = require('express');
const CandidateService = require('../services/candidate-service');

const CandidateServiceInstance = new CandidateService;

const candidateRouter = express.Router();


//get all candidates
candidateRouter.get('/', async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.getAllCandidates();
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//get all candidates by election id
candidateRouter.get('/election/:id', async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.getAllCandidatesByElectionId(req.params.id);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//get single candidate by id 
candidateRouter.get('/:id', async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.getCandidateById(req.params.id);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//add a candidate
candidateRouter.post('/add', async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.addCandidate(req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//amend a candidate by id
candidateRouter.put('/amend/:id', async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.amendCandidate(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//delete a candidate by id
candidateRouter.delete('/delete/:id', async (req, res, next) => {
    try {
        const response = await CandidateServiceInstance.deleteCandidate(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = candidateRouter;

