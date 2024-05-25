import { Request, Response } from 'express';
import ForumPost, { ForumPostQueryOptions } from '../models/forumPost';



export const createForumPost = async (req: Request, res: Response) => {
    try {
        const { content, forumId, title } = req.body;
        const userId = req.user?.userId;
        const forumPost = await ForumPost.create({ content, userId: Number(userId), forumId, title });
        res.status(201).json(forumPost);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create forum post' });
    }
};




export const getForumPosts = async (req: Request, res: Response) => {
    try {
        const { forumId } = req.params;
        const options: ForumPostQueryOptions = {
            where: { forumId: Number(forumId) },
        };
        const forumPosts = await ForumPost.findAll(options);
        res.json(forumPosts);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch forum posts' });
    }
};


export const updateForumPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const forumPost = await ForumPost.findByPk(id);

        if (!forumPost) {
            return res.status(404).json({ error: 'Forum post not found' });
        }

        forumPost.content = content;
        await forumPost.save();

        res.json(forumPost);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update forum post' });
    }
};

export const deleteForumPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const forumPost = await ForumPost.findByPk(id);

        if (!forumPost) {
            return res.status(404).json({ error: 'Forum post not found' });
        }

        await forumPost.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete forum post' });
    }
};
