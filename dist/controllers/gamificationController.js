"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPoints = exports.getUserGamification = void 0;
const gamification_1 = __importDefault(require("../models/gamification"));
const getUserGamification = async (req, res) => {
    try {
        const { userId } = req.params;
        const gamification = await gamification_1.default.findOne({ where: { userId } });
        if (!gamification) {
            return res.status(404).json({ error: 'Gamification data not found' });
        }
        res.json(gamification);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch gamification data' });
    }
};
exports.getUserGamification = getUserGamification;
const addPoints = async (req, res) => {
    try {
        const { userId, points, badges } = req.body;
        let gamification = await gamification_1.default.findOne({ where: { userId } });
        if (!gamification) {
            gamification = await gamification_1.default.create({ userId, points, badges });
        }
        else {
            gamification.points += points;
            await gamification.save();
        }
        res.json(gamification);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add points' });
    }
};
exports.addPoints = addPoints;
