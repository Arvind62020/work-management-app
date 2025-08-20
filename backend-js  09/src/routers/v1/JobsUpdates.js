import express from 'express';
import { createJobUpdate, getJobUpdateById, updateJobUpdate } from '../../controllers/jobUpdateController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';



const router = express.Router();

router.get('/:jobId', isAuthenticated, getJobUpdateById);

router.post('/', isAuthenticated,  createJobUpdate);
router.patch('/update/:updateId', isAuthenticated, updateJobUpdate);

export default router;



