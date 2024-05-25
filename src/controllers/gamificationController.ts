import { Request, Response } from 'express';
import Gamification from '../models/gamification';
import Badge from '../models/badge';

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

export const addBadge = async (req: Request, res: Response) => {
    try {
        const { userId, badge, points } = req.body;
        let gamification = await Gamification.findOne({ where: { userId } });

        if (!gamification) {
            gamification = await Gamification.create({ userId, badges: badge, points });
        } else {
            gamification.badges += `,${badge}`;
            await gamification.save();
        }

        res.json(gamification);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add badge' });
    }
};


export const awardBadge = async (req: Request, res: Response) => {
    try {
        const { userId, badgeId } = req.body;
        const badge = await Badge.create({ userId, badgeId });

        res.status(201).json({
            message: res.__('BADGE_EARNED'),
            badge
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to award badge' });
    }
};
