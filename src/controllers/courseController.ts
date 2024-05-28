import { Request, Response } from 'express';
import Course from '../models/course';

export const createCourse = async (req: Request, res: Response) => {

    try {
        const { title, description, content } = req.body;
        const userId = req.user?.userId;

        if (!title || !description || !content || !userId) {
            return res.status(400).json({ error: 'All fields are mandatory' });
        }

        const newCourse = await Course.create({ title, description, content, instructorId: Number(userId) });

        res.status(201).json({
            message: 'Course created successfully',
            course: newCourse
        });
    } catch (error) {

        res.status(400).json({ error: 'Failed to create course' });
    }
};

export const getCourseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id);

        if (!course) {
            return res.status(404).json('Course not found.');
        }

        res.json(course);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get course' });
    }
};

export const getCourses = async (req: Request, res: Response) => {
    try {

        const course = await Course.findAll();

        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }

        res.json(course);

    } catch (error) {
        res.status(400).json({ error: 'Failed to get courses' });
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, content } = req.body;
        const course = await Course.findByPk(id);

        if (!course) {
            return res.status(404).json({ error: 'Course post not found' });
        }

        course.title = title;
        course.description = description;
        course.content = content;

        await course.save();

        res.json(course);

    } catch (error) {
        res.status(400).json({ error: 'Failed to update course ' });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id);

        if (!course) {
            return res.status(404).json({ error: 'course not found' });
        }

        await course.destroy();
        res.status(204).send();

    } catch (error) {

        res.status(400).json({ error: 'Failed to course forum' });

    }
};
