import { Router } from 'express';
import {
    createCourse,
    deleteCourse,
    getCourseById,
    getCourses,
    updateCourse,
} from '../controllers/courseController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', auth, createCourse);
router.get('/', getCourses);
router.get('/:id', auth, getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
