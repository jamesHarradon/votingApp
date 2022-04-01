const AuthModel = require('../models/auth-model');
const UserModel = require('../models/user-model');

const UserModelInstance = new UserModel;
const AuthModelInstance = new AuthModel;

class UserService {

    async getUserById(id, role) {
        try {
            const user = await AuthModelInstance.findById(id, role);
            return user;
        } catch (error) {
            throw(error)
        }
    }

    async amendUser(id, role, body) {
        try {
            const amendSuccess = await UserModelInstance.amendUser(id, role, body);
            if (!amendSuccess.success) return null;
            const user = await AuthModelInstance.findById(id, role);
            return user;
        } catch (error) {
            throw(error)
        }
    }


    async amendUserPassword(id, role, body) {
        try {
            const password = await UserModelInstance.getPasswordByIdAndRole(id, role);
            const match = body.current_password === password;
            if(match) {
                const data = await this.amendUser(id, role, {password: body.new_password});
                return true;
            } else {
                throw new Error('There was a problem, password was not changed.')
            }
        } catch (err) {
            throw(err);
        } 
    }


}

module.exports = UserService;

