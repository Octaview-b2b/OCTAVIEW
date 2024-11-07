import { IuserRepository } from "../../core/interfaces/repositories/IUserRepository";
import { UserEntity } from "../../core/entities/userEntity";
import { UserModal } from "../data-sources/mongodb/models/User";

export class UserRepository implements IuserRepository {
    async create(user: UserEntity): Promise<void> {
        await UserModal.create(user)
    }
  // src/infrastructure/repositories/UserRepository.ts
async findByUserEmail(email: string): Promise<UserEntity | null> {
    console.log("Finding user with email:", email);  // Log the email
    const user = await UserModal.findOne({ email });
    return user ? new UserEntity(user.email, user.password, user.companyName) : null;
}

}
