"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForum = exports.getForumById = exports.createForum = void 0;
const forum_1 = __importDefault(require("../models/forum"));
const syncDatabase_1 = require("../syncDatabase");
const createForum = async (req, res) => {
    try {
        const { courseId, title } = req.body;
        const forum = await syncDatabase_1.Course.findByPk(courseId);
        if (!forum) {
            return res.status(404).json({ message: 'Forum id not found.' });
        }
        const newForum = await forum_1.default.create({ title, courseId: forum?.id });
        res.status(201).json({
            message: 'Forum successfully created!',
            forum: newForum
        });
    }
    catch (error) {
        console.error('Failed to create forum:', error);
        res.status(400).json({ error: 'Failed to create forum' });
    }
};
exports.createForum = createForum;
const getForumById = async (req, res) => {
    try {
        const { id } = req.params;
        const forum = await forum_1.default.findByPk(id);
        if (!forum) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.json(forum);
    }
    catch (error) {
        console.error('Erro ao procurar forum:', error);
        res.status(400).json({ error: 'Failed to get forum' });
    }
};
exports.getForumById = getForumById;
const getForum = async (req, res) => {
    try {
        const forum = await forum_1.default.findAll();
        if (!forum) {
            return res.status(404).json({ message: 'Course not found.' });
        }
        res.json(forum);
    }
    catch (error) {
        console.error('Erro ao procurar forum:', error);
        res.status(400).json({ error: 'Failed to get forum' });
    }
};
exports.getForum = getForum;
