// After /users the remaining part of url is handled here
import express from 'express';
import { getProfile, signin, signup, adminsignin } from '../../controllers/userController.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidator.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';
import { isAuthenticated ,isAdmin } from '../../middlewares/authMiddleware.js';
import rateLimit from 'express-rate-limit';
const router = express.Router();

/**
 * @swagger
 * /api/v1/users/profile:
 *  get:
 *      summary: Get user profile
 *      description: Get the profile of the authenticated user
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Profile fetched successfully
 *          401:
 *              description: Authentication required
 */
router.get('/profile', isAuthenticated, getProfile);

/**
 * @swagger
 * /api/v1/users/signup:
 *  post:
 *      summary: Signup a new user
 *      description: Create a new user account
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - email
 *                          - password
 *                      properties:
 *                          username:
 *                              type: string
 *                              minimum: 5
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              minimum: 5
 *      responses:
 *          201:
 *              description: User created successfully
 *          400:
 *              description: Validation error or user already exists
 */
router.post('/signup', validate(zodSignupSchema), signup);

/**
 * @swagger
 * /api/v1/users/signin:
 *  post:
 *      summary: Signin user
 *      description: Authenticate user and get JWT token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *                          password:
 *                              type: string
 *                              minimum: 5
 *      responses:
 *          200:
 *              description: Login successful
 *          401:
 *              description: Invalid credentials
 *          404:
 *              description: User not found
 */
router.post('/signin', validate(zodSigninSchema), signin);


const adminSigninLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts
    message: {
        success: false,
        message: "Too many admin login attempts"
    }
});

router.post('/adminsignin', adminSigninLimiter, validate(zodSigninSchema), adminsignin);
/**
 * @swagger
 * /api/v1/users/admin-only-route:
 *  get:
 *      summary: Admin only route
 *      description: Example admin-only endpoint
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Admin access granted
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden (not admin)
 */
router.get('/admin-only-route', isAuthenticated, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin access granted"
    });
});

export default router;