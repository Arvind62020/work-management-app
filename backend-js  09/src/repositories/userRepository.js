import User from '../schema/user.js';

export const findUserByEmail = async (email, includePassword = false) => {
    try {
        const query = User.findOne({ email });
        if (includePassword) {
            query.select('+password'); // Include password field
        }
        return await query.exec();
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
};

export const findAllUsers = async () => {
    try {
        return await User.find().exec();
    } catch (error) {
        console.error('Error finding all users:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const findUserById = async (userId) => {
    try {
        return await User.findById(userId).exec();
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error;
    }
};

export const updateUser = async (userId, updateData) => {
    try {
        return await User.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true, runValidators: true }
        ).exec();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};