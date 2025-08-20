import { signinUserService, signupUserService } from "../services/userService.js";
import { findUserByEmail } from "../repositories/userRepository.js"; // Add this import

export async function getProfile(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        // Remove sensitive information
        const userProfile = {
            _id: req.user._id,
            email: req.user.email,
            username: req.user.username,
            role: req.user.role
        };

        sendSuccessResponse(res, 200, "Profile fetched successfully", userProfile);
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

export async function signup(req, res) {
    try {
        const user = await signupUserService(req.body);
        sendSuccessResponse(res, 201, "User created successfully", user);
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

export async function signin(req, res) {
    try {
        const token = await signinUserService(req.body);
        sendSuccessResponse(res, 200, "Login successful", { token });
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

export async function adminsignin(req, res) {
    try {
        const { email, password } = req.body;
        
        // First check if user exists and is admin
        const user = await findUserByEmail(email, true); // Include password for verification
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Admin access only"
            });
        }

        // Verify password (reusing your existing service)
        const token = await signinUserService({ email, password });
        sendSuccessResponse(res, 200, "Admin login successful", { 
            token,
            role: 'admin' // Explicitly send role for frontend
        });
    } catch (error) {
        // Handle specific errors from signinUserService
        if (error.message === "Invalid credentials") {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }
        handleErrorResponse(res, error);
    }
}

// Helper functions
function sendSuccessResponse(res, status, message, data = null) {
    res.status(status).json({
        success: true,
        message,
        data
    });
}

function handleErrorResponse(res, error) {
    console.error('Controller error:', error);
    
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    
    res.status(status).json({
        success: false,
        message
    });
}