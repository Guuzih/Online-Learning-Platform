import { Router } from 'express';
import { getUserGamification, addPoints, addBadge } from '../controllers/gamificationController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:userId', auth, getUserGamification);
router.post('/points', auth, addPoints);
router.post('/badges', auth, addBadge);

export default router;
