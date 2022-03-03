const ElectionModel = require('../models/Election-model');

const ElectionModelInstance = new ElectionModel;

class ElectionService {

    async getAllElections() {
        try {
            const data = await ElectionModelInstance.getAllElections();
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async getElectionById(id) {
        try {
            const data = await ElectionModelInstance.getElectionById(id);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async addElection(body) {
        try {
            const addSuccess = await ElectionModelInstance.addElection(body);
            return addSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async amendElection(body) {
        try {
            const amendSuccess = await ElectionModelInstance.amendElection(body);
            return amendSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async deleteElection(id) {
        try {
            const deleteSuccess = await ElectionModelInstance.deleteElection(id);
            return deleteSuccess;
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = ElectionService;