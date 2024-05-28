"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourses = exports.getCourseById = exports.createCourse = void 0;
const course_1 = __importDefault(require("../models/course"));
const createCourse = async (req, res) => {
    try {
        const { title, description, content } = req.body;
        const userId = req.user?.userId;
        if (!title || !description || !content || !userId) {
            return res.status(400).json({ error: 'All fields are mandatory' });
        }
        const newCourse = await course_1.default.create({ title, description, content, instructorId: Number(userId) });
        res.status(201).json({
            message: 'Course created successfully',
            course: newCourse
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create course' });
    }
};
exports.createCourse = createCourse;
const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await course_1.default.findByPk(id);
        if (!course) {
            return res.status(404).json('Course not found.');
        }
        res.json(course);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to get course' });
    }
};
exports.getCourseById = getCourseById;
const getCourses = async (req, res) => {
    try {
        const course = await course_1.default.findAll();
        if (!course) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.json(course);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to get courses' });
    }
};
exports.getCourses = getCourses;
const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, content } = req.body;
        const course = await course_1.default.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'Course post not found' });
        }
        course.title = title;
        course.description = description;
        course.content = content;
        await course.save();
        res.json(course);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update course ' });
    }
};
exports.updateCourse = updateCourse;
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await course_1.default.findByPk(id);
        if (!course) {
            return res.status(404).json({ error: 'course not found' });
        }
        await course.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to course forum' });
    }
};
exports.deleteCourse = deleteCourse;
