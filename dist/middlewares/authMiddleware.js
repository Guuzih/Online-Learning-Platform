"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', "");
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = { userId: decoded.userId, username: decoded.username };
        next();
    }
    catch (error) {
        console.error("Error verifying token:", error);
        res.status(400).json({ message: 'Invalid token' });
    }
};
exports.auth = auth;
