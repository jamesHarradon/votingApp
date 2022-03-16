const CandidateModel = require('../models/candidate-model');

const CandidateModelInstance = new CandidateModel;

class CandidateService {

    async getAllCandidatesAdmin(id) {
        try {
            const data = await CandidateModelInstance.getAllCandidatesAdmin(id);
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

    async getCandidateById(id, electionId) {
        try {
            const data = await CandidateModelInstance.getCandidateById(id, electionId);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async addCandidate(body) {
        try {
            const data = await CandidateModelInstance.addCandidate(body);
            if (!data) return false;
            const addSuccess = await CandidateModelInstance.addToElectionCandidates(body.election_id, data.id)
            return addSuccess.success ? data : false
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