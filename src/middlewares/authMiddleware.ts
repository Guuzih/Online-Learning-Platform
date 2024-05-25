import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', "");

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    const secret = process.env.JWT_SECRET as Secret;
    if (!secret) {
        return res.status(500).json({ message: 'JWT secret is not defined' });
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = { userId: decoded.userId, username: decoded.username };

        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(400).json({ message: 'Invalid token' });
    }
};
