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
            const addSuccess = await CandidateModelInstance.addCandidate(body);
            return addSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async amendCandidate(body) {
        try {
            const amendSuccess = await CandidateModelInstance.amendCandidate(body);
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