const express = require('express');
const ElectionService = require('../services/election-service');

const ElectionServiceInstance = new ElectionService;

const electionRouter = express.Router();


//get all elections
electionRouter.get('/', async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.getAllElections();
        res.json(response);
    } catch (error) {
        next(error)
    }
})


//get single election by id 
electionRouter.get('/:id', async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.getElectionById(req.params.id);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//add a election
electionRouter.post('/add', async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.addElection(req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//amend a election by id
electionRouter.put('/amend/:id', async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.amendElection(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//delete a election by id
electionRouter.delete('/delete/:id', async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.deleteElection(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = electionRouter;