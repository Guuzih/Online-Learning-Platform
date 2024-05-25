import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
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

        const newUser = await User.create({ name, username, email, password });

        const { password: _, ...registeredUser } = newUser.dataValues;

        res.status(201).json({
            message: 'User successfully registered!',
            user: registeredUser
        });
    } catch (error) {
        res.status(400).json({ error: 'Failed to register user' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'The "email" field is mandatory' });
        }

        if (!password) {
            return res.status(400).json({ error: 'The "password" field is mandatory' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.dataValues.password)) {
            return res.status(401).json({ message: 'Invalid credentials, please try again.' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        res.json({
            message: 'Login successful!',
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
};