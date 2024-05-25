"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'The "name" field is mandatory' });
        }
        if (!username) {
            return res.status(400).json({ error: 'The "username" field is mandatory' });
        }
        if (!email) {
            return res.status(400).json({ error: 'The "email" field is mandatory' });
        }
        if (!password) {
            return res.status(400).json({ error: 'The "password" field is mandatory' });
        }
        const newUser = await user_1.default.create({ name, username, email, password });
        const { password: _, ...registeredUser } = newUser.dataValues;
        res.status(201).json({
            message: 'User successfully registered!',
            user: registeredUser
        });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to register user' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'The "email" field is mandatory' });
        }
        if (!password) {
            return res.status(400).json({ error: 'The "password" field is mandatory' });
        }
        const user = await user_1.default.findOne({ where: { email } });
        if (!user || !await bcrypt_1.default.compare(password, user.dataValues.password)) {
            return res.status(401).json({ message: 'Invalid credentials, please try again.' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: 'Login successful!',
            token
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
};
exports.loginUser = loginUser;
