const express = require('express');
const passport = require('passport')
const ManifestoService = require('../services/manifesto-service');

const ManifestoServiceInstance = new ManifestoService;
const manifestoRouter = express.Router();

//get single manifesto by candidateId 
manifestoRouter.get('/:candidateId', passport.authenticate('jwt-election', { session: false }), async (req, res, next) => {
    try {
        const response = await ManifestoServiceInstance.getManifestoByCandidateId(req.params.candidateId);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//add a manifesto
manifestoRouter.post('/add', passport.authenticate('jwt-candidate', { session: false }), async (req, res, next) => {
    try {
        const response = await ManifestoServiceInstance.addManifesto(req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//amend a manifesto by candidateId
manifestoRouter.put('/amend/:candidateId', passport.authenticate('jwt-candidate', { session: false }), async (req, res, next) => {
    try {
        const response = await ManifestoServiceInstance.amendManifesto(req.params.candidateId, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//delete a manifesto by id
manifestoRouter.delete('/delete/:manifestoId', passport.authenticate('jwt-admin', { session: false }), async (req, res, next) => {
    try {
        const response = await ManifestoServiceInstance.deleteManifesto(req.params.manifestoId);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = manifestoRouter;