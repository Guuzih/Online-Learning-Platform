import { Router } from 'express';
import {
    createCourse,
    getCourse,
} from '../controllers/courseController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', auth, createCourse);
//router.get('/', getCourses);
router.get('/:id', auth, getCourse);
//router.put('/:id', updateCourse);
//router.delete('/:id', deleteCourse);

export default router;
