const ManifestoModel = require('../models/manifesto-model');

const ManifestoModelInstance = new ManifestoModel;

class ManifestoService {

    async getManifestoById(id) {
        try {
            const data = await ManifestoModelInstance.getManifestoById(id);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async addManifesto(body) {
        try {
            const addSuccess = await ManifestoModelInstance.addManifesto(body);
            return addSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async amendManifesto(body) {
        try {
            const amendSuccess = await ManifestoModelInstance.amendManifesto(body);
            return amendSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async deleteManifesto(id) {
        try {
            const deleteSuccess = await ManifestoModelInstance.deleteManifesto(id);
            return deleteSuccess;
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = ManifestoService;