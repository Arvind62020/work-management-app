import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import { generateJwtToken } from "../utils/jwt.js";

export const signupUserService = async (userData) => {
    try {

        if (!userData.role || userData.role !== 'admin') {
            userData.role = 'user';
        }
        const user = await createUser(userData);

        // Return user profile without password
        return user.profile;
    } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
            // Check which field caused the duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            throw {
                status: 400,
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
            };
        }
        throw {
            status: 500,
            message: "Failed to create user"
        };
    }
};

export const signinUserService = async ({ email, password }) => {
    try {
        // Find user and include password for comparison
        const user = await findUserByEmail(email, true);
        
        if (!user) {
            throw {
                status: 404,
                message: "User not found"
            };
        }

        if (!user.isActive) {
            throw {
                status: 403,
                message: "Account is deactivated"
            };
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw {
                status: 401,
                message: "Invalid credentials"
            };
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        return generateJwtToken({
            email: user.email,
            _id: user._id,
            username: user.username,
            role: user.role
        });
    } catch (error) {
        if (error.status) {
            throw error;
        }
        throw {
            status: 500,
            message: "Authentication failed"
        };
    }
};

export const checkIfUserExists = async (email) => {
    return await findUserByEmail(email);
};