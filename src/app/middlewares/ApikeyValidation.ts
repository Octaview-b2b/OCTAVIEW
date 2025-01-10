import { Request, Response, NextFunction } from 'express';
import { SettingsRepository } from '../../infrastructure/repositories/SettingsRepositery';

const settingsRepository = new SettingsRepository();

export const checkApiKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authorizationHeader = req.headers['authorization'];
  const apiKey = authorizationHeader ? authorizationHeader.split(' ')[1] : null; // Extract the token from "Bearer <apiKey>"
  const userId = req.params.userId as string;

  console.log('api & id', apiKey, userId);

  if (!apiKey) {
    res.status(400).json({ error: 'API key is missing' });
    return; 
  }

  if (!userId) {
    res.status(400).json({ error: 'User ID is missing' });
    return; 
  }

  try {
    const isValid = await settingsRepository.validateApiKey(apiKey, userId);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid API key' });
      return; 
    }


    next();
  } catch (error) {
    console.error('Error validating API key:', error);
    res.status(500).json({ error: 'Server error' });
    return; 
  }
};
