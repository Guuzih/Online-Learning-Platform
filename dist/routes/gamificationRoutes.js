"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gamificationController_1 = require("../controllers/gamificationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/:userId', authMiddleware_1.auth, gamificationController_1.getUserGamification);
router.post('/points', authMiddleware_1.auth, gamificationController_1.addPoints);
exports.default = router;
