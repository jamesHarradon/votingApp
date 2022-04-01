const ElectionModel = require('../models/election-model');

const ElectionModelInstance = new ElectionModel;

class ElectionService {

    async getAllElections(id, role) {
        let data;
        try {
            if (role === 'admin') {
                data = await ElectionModelInstance.getAllElectionsAdmin(id);
            }
            if (role === 'voter') {
                data = await ElectionModelInstance.getAllElectionsVoter(id);
            }
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async getAllElectionIds(id, role) {
        let data;
        try {
            if (role === 'admin') {
                data = await ElectionModelInstance.getAllElectionIdsAdmin(id);
                if(!data) return null;
            }
            if (role === 'voter') {
                data = await ElectionModelInstance.getAllElectionIdsVoter(id);
                if(!data) return null;
            }
            let election_ids = []
            data.forEach(row => election_ids.push(row.id));
            return election_ids;
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