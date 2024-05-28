"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteForumPost = exports.updateForumPost = exports.getForumPosts = exports.createForumPost = void 0;
const forumPost_1 = __importDefault(require("../models/forumPost"));
const createForumPost = async (req, res) => {
    try {
        const { content, title } = req.body;
        const { forumId } = req.params;
        const userId = req.user?.userId;
        const forumPost = await forumPost_1.default.create({ content, userId: Number(userId), forumId: Number(forumId), title });
        res.status(201).json(forumPost);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to create forum post' });
    }
};
exports.createForumPost = createForumPost;
const getForumPosts = async (req, res) => {
    try {
        const { forumId } = req.params;
        const options = {
            where: { forumId: Number(forumId) },
        };
        const forumPosts = await forumPost_1.default.findAll(options);
        res.json(forumPosts);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to fetch forum posts' });
    }
};
exports.getForumPosts = getForumPosts;
const updateForumPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const forumPost = await forumPost_1.default.findByPk(id);
        if (!forumPost) {
            return res.status(404).json({ error: 'Forum post not found' });
        }
        forumPost.content = content;
        await forumPost.save();
        res.json(forumPost);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update forum post' });
    }
};
exports.updateForumPost = updateForumPost;
const deleteForumPost = async (req, res) => {
    try {
        const { id } = req.params;
        const forumPost = await forumPost_1.default.findByPk(id);
        if (!forumPost) {
            return res.status(404).json({ error: 'Forum post not found' });
        }
        await forumPost.destroy();
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to delete forum post' });
    }
};
exports.deleteForumPost = deleteForumPost;
