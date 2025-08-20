import mongoose from "mongoose";

const jobupdatesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,  // Changed from String to ObjectId
        required: true,
        ref: "Job"  // Added reference to Job model
    }
}, { timestamps: true });

const JobUpdate = mongoose.model("JobUpdate", jobupdatesSchema);

export default JobUpdate;