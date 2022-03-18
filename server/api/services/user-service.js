import AuthModel from '../models/auth-model';
import UserModel from '../models/user-model'

const UserModelInstance = new UserModel;
const AuthModelInstance = new AuthModel;

class UserService {
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
}

module.exports = UserService;

