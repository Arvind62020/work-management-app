import express from 'express';

import JobRouter from './Job.js';
import userRouter from './user.js';
import jobsUpdatesRouter from './JobsUpdates.js';
const router = express.Router();


router.use('/jobs', JobRouter); // if in the remaining url i.e. after /api/v1, we have the url starting with /posts , then the request is forwarded to postRouter

router.use('/users', userRouter); // if in the remaining url i.e. after /api/v1, we have the url starting with /users , then the request is forwarded to userRouter

router.use('/jobupdate', jobsUpdatesRouter);


export default router;