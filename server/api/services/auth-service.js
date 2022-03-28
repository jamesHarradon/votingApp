const AuthModel = require("../models/auth-model");
const AuthModelInstance = new AuthModel;
const ElectionService = require('../services/election-service');
const ElectionServiceInstance = new ElectionService;
class AuthService {
    async getUser(email) {
        const user = await AuthModelInstance.findOne(email);
        if(!user) return null;
        if(user.role === 'candidate') return user;
        const data = await ElectionServiceInstance.getAllElectionIds(user.id, user.role);
        return data ? {...user, election_ids: data} : null
    }
}

module.exports = AuthService;