import  jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export class AuthTokenService{
    generateToken(payload:object):string{
        return jwt.sign(payload,JWT_SECRET||"secrect",{expiresIn:'7d'})
    }
}  