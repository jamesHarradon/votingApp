
const ElectionModel = require('../models/election-model');
const VoterModel = require('../models/voter-model');
const AuthModel = require('../models/auth-model')

const ElectionModelInstance = new ElectionModel;
const VoterModelInstance = new VoterModel;
const AuthModelInstance = new AuthModel;

class VoterService {

    async getAllVotersAdmin(id) {
        try {
            const data = await VoterModelInstance.getAllVotersAdmin(id);
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

    async getVoterData(voterId, electionId) {
        try {
            const data = await VoterModelInstance.getVoterData(voterId, electionId);
            return data;
        } catch (error) {
            throw(error)
        }
    }

    async addVoter(body) {
        try {
            //allows voters to be added to more than one election
            const existingData = await AuthModelInstance.findOne(body.email);
            let data = existingData || null;
            if (!existingData) data = await VoterModelInstance.addVoter(body);
            if(!data) return false;
            const addSuccess = await VoterModelInstance.addToElectionVoters(body.election_id, data.id);
            await ElectionModelInstance.incrementVoterCandidate(body.election_id, 'voter');
            return addSuccess.success ? data : false
        } catch (error) {
            throw(error)
        }
    }

    async placeVote(voterId, candidateId) {
        try {
            const electionIdCandidate = await ElectionModelInstance.getElectionIdByCandidateId(candidateId);
            const hasVoted = await VoterModelInstance.getHasVoted(voterId, electionIdCandidate);
            if(hasVoted) throw new Error('Voter has already voted in this election!')
            const placeVoteSuccess = await VoterModelInstance.setHasVoted(voterId, candidateId, electionIdCandidate);
            const emailData = await VoterModelInstance.getVoterData(voterId, electionIdCandidate);
            return placeVoteSuccess.success ? {success: true, data: emailData} : {success: false}
        } catch (error) {
            throw(error)
        }
    }

    async getHasVoted(voterId, electionId) {
        try {
            const data = VoterModelInstance.getHasVoted(voterId, electionId);
            return data;
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

    async deleteVoter(voterId, electionId) {
        try {
            const deleteSuccess = await VoterModelInstance.deleteVoter(voterId);
            await ElectionModelInstance.decrementVoterCandidate(electionId, 'voter');
            return deleteSuccess;
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = VoterService;