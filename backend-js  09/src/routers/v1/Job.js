// Here all the post related routes are present
// We look at the remaining url part after /posts
import express from 'express';
import { createJob, deleteJob, getAllJobs, getJobByEmail, getJobById, updateJob, userUpdateJob } from '../../controllers/JobController.js'; 

// import { s3uploader } from '../../config/multerConfig.js';

import { validate } from '../../validators/zodValidator.js';
import { zodJobSchema } from '../../validators/zodJobSchema.js';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router(); // Router object to modularize the routes






router.post('/', isAuthenticated, validate(zodJobSchema), createJob);


router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.get('/assign/:email', getJobByEmail);



router.delete('/:id', isAuthenticated, deleteJob);
router.put('/user/:id', isAuthenticated, userUpdateJob);

router.put('/:id', isAuthenticated, isAdmin, updateJob);

export default router;

