"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const performanceController_1 = require("../controllers/performanceController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/:userId', authMiddleware_1.auth, performanceController_1.getUserPerformance);
router.post('/', authMiddleware_1.auth, performanceController_1.addOrUpdatePerformance);
exports.default = router;
