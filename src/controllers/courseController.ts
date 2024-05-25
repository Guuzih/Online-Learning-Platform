import { Request, Response } from 'express';
import Course from '../models/course';


export const createCourse = async (req: Request, res: Response) => {
    try {
        const { title, description, content } = req.body;
        const instructorId = req.user?.userId

        if (!title || !description || !content || !instructorId) {
            return res.status(400).json({ error: 'All fields are mandatory' });
        }

        const newCourse = await Course.create({ title, description, content, instructorId: Number(instructorId) });

        res.status(201).json({
            message: 'Curso criado com sucesso',
            course: newCourse
        });
    } catch (error) {

        res.status(400).json({ error: 'Falha ao criar curso' });
    }
};

export const getCourse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const course = await Course.findByPk(id);

        if (!course) {
            return res.status(404).json({ message: res.__('COURSE_NOT_FOUND') });
        }

        res.json(course);
    } catch (error) {
        res.status(400).json({ error: 'Failed to get course' });
    }
};
