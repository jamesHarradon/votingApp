const CandidateModel = require('../models/candidate-model');
const ManifestoModel = require('../models/manifesto-model');
const ElectionModel = require('../models/election-model');

const CandidateModelInstance = new CandidateModel;
const ManifestoModelInstance = new ManifestoModel;
const ElectionModelInstance = new ElectionModel;

class CandidateService {

    async getAllCandidates(id, role) {
        let data;
        try {
            if(role === 'admin') {
                data = await CandidateModelInstance.getAllCandidatesAdmin(id);
            }
            if(role === 'voter') {
                data = await CandidateModelInstance.getAllCandidatesVoter(id);
            }
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
            const addManifestoSuccess = await ManifestoModelInstance.addManifestoInitial(data.id);
            if(!addManifestoSuccess.success) return false;
            const addSuccess = await CandidateModelInstance.addToElectionCandidates(body.election_id, data.id)
            await ElectionModelInstance.incrementVoterCandidate(body.election_id, 'candidate');
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

    async deleteCandidate(candidateId, electionId) {
        try {
            const deleteSuccess = await CandidateModelInstance.deleteCandidate(candidateId);
            await ElectionModelInstance.decrementVoterCandidate(electionId, 'candidate')
            return deleteSuccess;
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = CandidateService;