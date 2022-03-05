const CandidateModel = require('../models/candidate-model');

const CandidateModelInstance = new CandidateModel;

class CandidateService {

    async getAllCandidates() {
        try {
            const data = await CandidateModelInstance.getAllCandidates();
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async getAllCandidatesByElectionId(id) {
        try {
            const data = await CandidateModelInstance.getAllCandidatesByElectionId(id);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async getCandidateById(id) {
        try {
            const data = await CandidateModelInstance.getCandidateById(id);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async addCandidate(body) {
        try {
            const data = await CandidateModelInstance.addCandidate(body);
            if (!data) return {success: false};
            const addSuccess = await CandidateModelInstance.addToElectionCandidates(body.election_id, data.id)
            return addSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async amendCandidate(id, body) {
        try {
            const amendSuccess = await CandidateModelInstance.amendCandidate(id, body);
            return amendSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async deleteCandidate(id) {
        try {
            const deleteSuccess = await CandidateModelInstance.deleteCandidate(id);
            return deleteSuccess;
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = CandidateService;