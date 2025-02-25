import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/env';

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
console.log('hi on middle',authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return; 
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET || 'secret');
        (req as any).user = decoded; 
        next(); 
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            if (err.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Unauthorized: Token has expired' });
            } else if (err.name === 'JsonWebTokenError') {
                res.status(403).json({ message: 'Forbidden: Invalid token' });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    }

