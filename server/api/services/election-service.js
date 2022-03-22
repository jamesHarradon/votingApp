const ElectionModel = require('../models/Election-model');

const ElectionModelInstance = new ElectionModel;

class ElectionService {

    async getAllElectionsAdmin(id) {
        try {
            const data = await ElectionModelInstance.getAllElectionsAdmin(id);
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

    async addElection(adminId, body) {
        try {
            const addSuccess = await ElectionModelInstance.addElection(body);
            if(!addSuccess.success) return addSuccess
            const addToAdminElections = await ElectionModelInstance.addToAdminElections(adminId, addSuccess.election_id)
            return addToAdminElections;
        } catch (error) {
            throw(error)
        }
    }

    async amendElection(id, body) {
        try {
            const amendSuccess = await ElectionModelInstance.amendElection(id, body);
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