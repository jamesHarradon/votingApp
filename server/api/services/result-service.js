const ResultModel = require('../models/result-model');

const ResultModelInstance = new ResultModel

class ResultService {
    async getResultsByAdmin(id) {
        try {
            const data = await ResultModelInstance.getResultsByAdmin(id);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async getResultByElection(id) {
        try {
           const data = await ResultModelInstance.getResultByElection(id);
           return data;
        } catch (error) {
            throw(error)
        }
    }

    async getVotedCandidateByVoter(id) {
        try {
           const data = await ResultModelInstance.getVotedCandidateByVoter(id);
           return data;
        } catch (error) {
            throw(error)
        }
    }

    
}

module.exports = ResultService;