"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrUpdatePerformance = exports.getUserPerformance = void 0;
const performance_1 = __importDefault(require("../models/performance"));
const getUserPerformance = async (req, res) => {
    try {
        const { userId } = req.params;
        const performance = await performance_1.default.findAll({ where: { userId } });
        if (!performance) {
            return res.status(404).json({ error: 'Performance data not found' });
        }
        res.json(performance);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch performance data' });
    }
};
exports.getUserPerformance = getUserPerformance;
const addOrUpdatePerformance = async (req, res) => {
    try {
        const { userId, courseId, progress, score } = req.body;
        let performance = await performance_1.default.findOne({ where: { userId, courseId } });
        if (!performance) {
            performance = await performance_1.default.create({ userId, courseId, progress, score });
        }
        else {
            performance.progress = progress;
            performance.score = score;
            await performance.save();
        }
        res.json(performance);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add or update performance' });
    }
};
exports.addOrUpdatePerformance = addOrUpdatePerformance;
