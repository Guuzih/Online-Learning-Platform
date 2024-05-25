import { Router } from 'express';
import {
    createForum,
    getForum,
    getForumById,
} from '../controllers/forumController';
import {
    createForumPost,
    getForumPosts,
    updateForumPost,
    deleteForumPost,
} from '../controllers/forumPostController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', auth, createForum);
router.get('/', auth, getForum);
router.get('/:id', auth, getForumById);
//router.put('/:id', updateForum);
//router.delete('/:id', deleteForum);

router.post('/:forumId/posts', auth, createForumPost);
router.get('/:forumId/posts', auth, getForumPosts);
router.put('/posts/:id', auth, updateForumPost);
router.delete('/posts/:id', auth, deleteForumPost);

export default router;
