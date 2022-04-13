const AdminModel = require("../models/admin-model");
const AuthModel = require("../models/auth-model");

const AdminModelInstance = new AdminModel
const AuthModelInstance = new AuthModel

class AdminService {
    async register(body) {
        try {
            const hasAccount = await AuthModelInstance.findOne(body.email);
            if (hasAccount) return {message: 'Account with this email address has already registered, please login.'}
            const data = await AdminModelInstance.register(body);
            return data;
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = AdminService;