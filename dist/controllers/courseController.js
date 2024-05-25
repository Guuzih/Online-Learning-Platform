"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourse = exports.createCourse = void 0;
const course_1 = __importDefault(require("../models/course"));
const createCourse = async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const instructorId = req.user?.userId;
        if (!title || !description || !content || !instructorId) {
            return res.status(400).json({ error: 'All fields are mandatory' });
        }
        const newCourse = await course_1.default.create({ title, description, content, instructorId: Number(instructorId) });
        res.status(201).json({
            message: 'Curso criado com sucesso',
            course: newCourse
        });
    }
    catch (error) {
        console.error('Erro ao criar curso:', error);
        res.status(400).json({ error: 'Falha ao criar curso' });
    }
};
exports.createCourse = createCourse;
const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await course_1.default.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: res.__('COURSE_NOT_FOUND') });
        }
        res.json(course);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to get course' });
    }
};
exports.getCourse = getCourse;
