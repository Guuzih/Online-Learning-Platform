import { Request, Response } from 'express';
import Forum from '../models/forum';
import { Course } from '../syncDatabase';

export const createForum = async (req: Request, res: Response) => {
    try {
        const { courseId, title } = req.body;

        const forum = await Course.findByPk(courseId);

        if (!forum) {
            return res.status(404).json({ message: 'Forum id not found.' });
        }

        const newForum = await Forum.create({ title, courseId: forum?.id });

        res.status(201).json({
            message: 'Forum successfully created!',
            forum: newForum
        });
    } catch (error) {

        res.status(400).json({ error: 'Failed to create forum' });

    }
};

export const getForumById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const forum = await Forum.findByPk(id);

        if (!forum) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        res.json(forum);

    } catch (error) {

        console.error(error);
        res.status(400).json({ error: 'Failed to get forum' });

    }
};

export const getForum = async (req: Request, res: Response) => {
    try {

        const forum = await Forum.findAll();

        if (!forum) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        res.json(forum);

    } catch (error) {

        console.error(error);
        res.status(400).json({ error: 'Failed to get forum' });

    }
};

export const updateForum = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, courseId } = req.body;
        const forum = await Forum.findByPk(id);

        if (!forum) {
            return res.status(404).json({ error: 'Forum post not found' });
        }

        forum.courseId = courseId;
        forum.title = title;

        await forum.save();

        res.json(forum);

    } catch (error) {
        res.status(400).json({ error: 'Failed to update forum post' });
    }
};

export const deleteForum = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const forum = await Forum.findByPk(id);

        if (!forum) {
            return res.status(404).json({ error: 'Forum post not found' });
        }

        await forum.destroy();
        res.status(204).send();

    } catch (error) {
        res.status(400).json({ error: 'Failed to delete forum post' });
    }
};
