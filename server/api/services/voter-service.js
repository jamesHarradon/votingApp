
const ElectionModel = require('../models/Election-model');
const VoterModel = require('../models/voter-model');

const ElectionModelInstance = new ElectionModel;
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
            const data = await VoterModelInstance.addVoter(body);
            if(!data) return {success: false};
            const addSuccess = await VoterModelInstance.addToElectionVoters(body.election_id, data.id);
            return addSuccess;
        } catch (error) {
            throw(error)
        }
    }

    async placeVote(voterId, candidateId) {
        try {
            const electionIdCandidate = await ElectionModelInstance.getElectionIdByCandidateId(candidateId);
            const electionIdVoter = await VoterModelInstance.getElectionIdByVoterId(voterId);
            if(electionIdCandidate !== electionIdVoter) throw new Error('Selected candidate not in election Voter has signed up for')
            const placeVoteSuccess = await VoterModelInstance.addToVotersCandidates(voterId, candidateId);
            const setHasVotedSuccess = await VoterModelInstance.setHasVoted(voterId);
            return placeVoteSuccess.success && setHasVotedSuccess.success ? {success: true} : {success: false}
        } catch (error) {
            throw(error)
        }
    }

    async amendVoter(id, body) {
        try {
            const amendSuccess = await VoterModelInstance.amendVoter(id, body);
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