import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minLength: [5, 'Username must be at least 5 characters long'],
        maxLength: [30, 'Username cannot exceed 30 characters'],
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        minLength: [6, 'Email must be at least 6 characters long'],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (emailValue) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
            },
            message: 'Please provide a valid email address'
        }
    },
    role: {
        type: String,
        default: "user",
        enum: {
            values: ["user", "admin"],
            message: 'Role must be either "user" or "admin"'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password must be at least 5 characters long'],
        select: false // Don't include password in queries by default
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    try {
        const SALT_ROUNDS = 12;
        const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for user's full profile (excluding password)
userSchema.virtual('profile').get(function() {
    return {
        _id: this._id,
        username: this.username,
        email: this.email,
        role: this.role,
        isActive: this.isActive,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
});

const User = mongoose.model("User", userSchema);

export default User;

