const ResultModel = require('../models/result-model');
const ElectionModel = require('../models/election-model');

const ResultModelInstance = new ResultModel;
const ElectionModelInstance = new ElectionModel;

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

    async getResults(id) {
        try {
            const election = await ElectionModelInstance.getElectionById(id);
            const results = await ResultModelInstance.getResults(id);
            return {election: election, winner: results.rows[0], results: results.rows}
        } catch (error) {
            throw(error)
        }
    }

    
}

module.exports = ResultService;