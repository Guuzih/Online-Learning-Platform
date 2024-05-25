import { Router } from 'express';
import { getUserPerformance, addOrUpdatePerformance } from '../controllers/performanceController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:userId', auth, getUserPerformance);
router.post('/', auth, addOrUpdatePerformance);

export default router;
