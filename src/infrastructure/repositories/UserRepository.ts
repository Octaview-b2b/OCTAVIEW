import { IuserRepository } from "../../core/interfaces/repositories/IUserRepository";
import { UserEntity } from "../../core/entities/userEntity";
import { UserModel } from "../data-sources/mongodb/models/User";
import { IUser } from "../data-sources/mongodb/models/User";

export class UserRepository implements IuserRepository {
    async create(user: UserEntity): Promise<void> {
        // MongoDB will automatically generate the id field
        await UserModel.create(user);
    }

    async findByUserEmail(email: string): Promise<UserEntity | null> {
        // Explicitly cast the result to IUser
        const user = await UserModel.findOne({ email }).lean<IUser>().exec(); // .lean<IUser>() ensures the result is a plain object.
    
        // Check if user is found and return the UserEntity with proper types
        return user ? new UserEntity(user._id.toString(), user.email, user.password, user.companyName) : null;
    }
}
