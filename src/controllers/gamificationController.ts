import { Request, Response } from 'express';
import Gamification from '../models/gamification';


export const getUserGamification = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const gamification = await Gamification.findOne({ where: { userId } });

        if (!gamification) {
            return res.status(404).json({ error: 'Gamification data not found' });
        }

        res.json(gamification);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch gamification data' });
    }
};

export const addPoints = async (req: Request, res: Response) => {
    try {
        const { userId, points, badges } = req.body;
        let gamification = await Gamification.findOne({ where: { userId } });

        if (!gamification) {
            gamification = await Gamification.create({ userId, points, badges });
        } else {
            gamification.points += points;
            await gamification.save();
        }

        res.json(gamification);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add points' });
    }
};

