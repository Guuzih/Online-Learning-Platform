import { Request, Response } from 'express';
import Performance from '../models/performance';

export const getUserPerformance = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const performance = await Performance.findAll({ where: { userId } });

        if (!performance) {
            return res.status(404).json({ error: 'Performance data not found' });
        }

        res.json({ performance });
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch performance data' });
    }
};

export const addOrUpdatePerformance = async (req: Request, res: Response) => {
    try {
        const { courseId, progress, score } = req.body;

        const userId = req.user?.userId

        let performance = await Performance.findOne({ where: { userId, courseId } });

        if (!performance) {
            performance = await Performance.create({ userId: Number(userId), courseId, progress, score });
        } else {
            performance.progress = progress;
            performance.score = score;
            await performance.save();

        }

        res.json(performance);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Failed to add or update performance' });
    }
};
