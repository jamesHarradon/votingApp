const express = require('express');
const ManifestoService = require('../services/manifesto-service');

const ManifestoServiceInstance = new ManifestoService;
const manifestoRouter = express.Router();

//get single manifesto by id 
manifestoRouter.get('/:id', async (req, res, next) => {
    try {
        const response = await ManifestoServiceInstance.getManifestoById(req.params.id);
        res.json(response);
    } catch (error) {
        next(error);
    }
})

//add a manifesto
manifestoRouter.post('/add', async (req, res, next) => {
    try {
        const response = await ManifestoServiceInstance.addManifesto(req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

//amend a manifesto by id
manifestoRouter.put('/amend/:id', async (req, res, next) => {
    try {
        const response = await ManifestoServiceInstance.amendManifesto(req.params.id, req.body);
        res.json(response);
    } catch (error) {
        next(error)
    }
});

//delete a manifesto by id
manifestoRouter.delete('/delete/:id', async (req, res, next) => {
    try {
        const response = await ManifestoServiceInstance.deleteManifesto(req.params.id);
        res.json(response);
    } catch (error) {
        next(error)
    }
})

module.exports = manifestoRouter;