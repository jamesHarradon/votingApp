const VoterModel = require('../models/voter-model');

const VoterModelInstance = new VoterModel;

class VoterService {

    async getAllVoters() {
        try {
            const data = await VoterModelInstance.getAllVoters();
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async getAllVotersByElectionId(id) {
        try {
            const data = await VoterModelInstance.getAllVotersByElectionId(id);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async getVoterById(id) {
        try {
            const data = await VoterModelInstance.getVoterById(id);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async addVoter(body) {
        try {
            const addSuccess = await VoterModelInstance.addVoter(body);
            return addSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async amendVoter(body) {
        try {
            const amendSuccess = await VoterModelInstance.amendVoter(body);
            return amendSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async deleteVoter(id) {
        try {
            const deleteSuccess = await VoterModelInstance.deleteVoter(id);
            return deleteSuccess;
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = VoterService;