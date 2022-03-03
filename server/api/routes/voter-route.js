const express = require('express');
const VoterService = require('../services/voter-service');

const VoterServiceInstance = new VoterService;

const voterRouter = express.Router();


//get all voters
voterRouter.get('/', async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.getAllVoters();
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//get all voters by election id
voterRouter.get('/election/:id', async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.getAllVotersByElectionId(req.params.id);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//get single voter by id 
voterRouter.get('/:id', async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.getVoterById(req.params.id);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//add a voter
voterRouter.post('/add', async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.addVoter(req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//amend a voter by id
voterRouter.put('/amend/:id', async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.amendVoter(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//delete a voter by id
voterRouter.delete('/delete/:id', async (req, res, next) => {
    try {
        const response = await VoterServiceInstance.deleteVoter(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = voterRouter;