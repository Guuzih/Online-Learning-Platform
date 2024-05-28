import { Router } from 'express';
import { getUserGamification, addPoints } from '../controllers/gamificationController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:userId', auth, getUserGamification);
router.post('/points', auth, addPoints);


export default router;
