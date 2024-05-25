"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awardBadge = exports.addBadge = exports.addPoints = exports.getUserGamification = void 0;
const gamification_1 = __importDefault(require("../models/gamification"));
const badge_1 = __importDefault(require("../models/badge"));
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
const addBadge = async (req, res) => {
    try {
        const { userId, badge, points } = req.body;
        let gamification = await gamification_1.default.findOne({ where: { userId } });
        if (!gamification) {
            gamification = await gamification_1.default.create({ userId, badges: badge, points });
        }
        else {
            gamification.badges += `,${badge}`;
            await gamification.save();
        }
        res.json(gamification);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to add badge' });
    }
};
exports.addBadge = addBadge;
const awardBadge = async (req, res) => {
    try {
        const { userId, badgeId } = req.body;
        const badge = await badge_1.default.create({ userId, badgeId });
        res.status(201).json({
            message: res.__('BADGE_EARNED'),
            badge
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to award badge' });
    }
};
exports.awardBadge = awardBadge;
