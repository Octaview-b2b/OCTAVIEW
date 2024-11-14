import { promises } from "dns";
import { UserEntity } from "../../entities/userEntity";

export interface IuserRepository{
    create(user:UserEntity):Promise<void>;
    findByUserEmail(email:string):Promise<UserEntity|null>
}