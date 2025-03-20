import { IuserRepository } from "../../core/interfaces/user/IUserRepository";
import { UserEntity } from "../../core/entities/userEntity";
import { UserModel } from "../data-sources/mongodb/models/User";
import { IUser } from "../data-sources/mongodb/models/User";

export class UserRepository implements IuserRepository {
    async create(user: UserEntity): Promise<void> {
        await UserModel.create(user);

    }

    async findByUserEmail(email: string): Promise<UserEntity | null> {
        const user = await UserModel.findOne({ email }).lean<IUser>().exec(); 
        return user ? new UserEntity(user._id.toString(), user.email, user.password, user.companyName) : null;
    }
}
