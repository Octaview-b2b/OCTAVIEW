"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const userEntity_1 = require("../../core/entities/userEntity");
const User_1 = require("../data-sources/mongodb/models/User");
class UserRepository {
    async create(user) {
        // MongoDB will automatically generate the id field
        await User_1.UserModel.create(user);
    }
    async findByUserEmail(email) {
        // Explicitly cast the result to IUser
        const user = await User_1.UserModel.findOne({ email }).lean().exec(); // .lean<IUser>() ensures the result is a plain object.
        // Check if user is found and return the UserEntity with proper types
        return user ? new userEntity_1.UserEntity(user._id.toString(), user.email, user.password, user.companyName) : null;
    }
}
exports.UserRepository = UserRepository;
