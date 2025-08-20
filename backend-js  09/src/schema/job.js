import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        
    },
    description: {
        type: String,
        required: true,
        minlength: 5
    },
    assignTo: {
        type: String,
        required: true,
        default: "Na",
        minlength: 2
    },
    accepted: {
        type: String,
        enum: ["false", "true"],
        default: "false"  // MOVED HERE
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    
    status: {
    type: String,
    enum: ["open", "in-progress", "completed"],
    default: "open"  // MOVED HERE
}


}, { 
    timestamps: true 
});

const Job = mongoose.model("Job", jobSchema);

export default Job;