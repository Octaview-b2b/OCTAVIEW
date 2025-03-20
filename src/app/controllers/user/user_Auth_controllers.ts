import { Request, Response } from 'express';
import { AuthUser } from '../../../core/use-cases/user/AuthUser';
import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { HashService } from '../../../utils/HashService';
import { AuthTokenService } from '../../../utils/AuthTokenService';

const userRepository = new UserRepository();
const hashService = new HashService();
const authTokenService = new AuthTokenService();
const authuser = new AuthUser(userRepository, hashService, authTokenService);

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, companyName } = req.body;
        const { token, user } = await authuser.signup(email, password, companyName);
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
};

export const login = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;
      const { token, user } = await authuser.login(email, password);
      res.status(200).json({ token, user });
  } catch (error) {
      console.error("Login error:", error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
};
