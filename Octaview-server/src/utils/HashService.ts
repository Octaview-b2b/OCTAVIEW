import bcrypt from 'bcryptjs';

export class HashService{
    async hashPassword(password:string):Promise<string>{
        return await bcrypt.hash(password,10);
    }
    async compare(password:string,hash:string):Promise<Boolean>{
        return  bcrypt.compare(password,hash);
    }
}