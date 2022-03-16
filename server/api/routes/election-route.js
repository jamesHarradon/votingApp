const express = require('express');
const passport = require('passport')
const ElectionService = require('../services/election-service');

const ElectionServiceInstance = new ElectionService;

const electionRouter = express.Router();


//get all elections for admin (admin may have more than one election)
electionRouter.get('/admin/:id', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.getAllElectionsAdmin(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})


//get single election by id - users only have access to election data they are registered for 
electionRouter.get('/:electionId', passport.authenticate('jwt-election', { session: false }), async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.getElectionById(req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//add a election
electionRouter.post('/add/:adminId', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.addElection(req.params.adminId, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//amend a election by id
electionRouter.put('/amend/:electionId', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.amendElection(req.params.electionId, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//delete a election by id
electionRouter.delete('/delete/:electionId', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.deleteElection(req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//get results of an election
electionRouter.get('/results/:electionId', passport.authenticate('jwt-election', { session: false }), async (req, res, next) => {
    try {
        const response = await ElectionServiceInstance.getResults(req.params.electionId);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = electionRouter;