import mongoose from 'mongoose';
import { createJobUpdate, findJobUpdateById, updateJobUpdateById } from "../repositories/jobUpdatesRepository.js";
import { findJobById } from "../repositories/jobRepository.js";

export const createJobUpdateService = async (title, userId, description, jobId) => {
    // Validate jobId format
    if (!mongoose.isValidObjectId(jobId)) {
        throw {
            status: 400,
            message: "Invalid job ID format"
        };
    }

    const jobObjectId = new mongoose.Types.ObjectId(jobId);
    
    // Verify the referenced job exists
    const job = await findJobById(jobObjectId);
    if (!job) {
        throw {
            status: 404,
            message: "Job not found"
        };
    }

    const jobUpdate = await createJobUpdate({
        title,
        userId,
        description,
        jobId: jobObjectId  // Use the converted ObjectId
    });

    return jobUpdate;
};

export const findJobUpdateByIdService = async (jobId) => {
    if (!mongoose.isValidObjectId(jobId)) {
        throw {
            status: 400,
            message: "Invalid ID format"
        };
    }

    const jobUpdate = await findJobUpdateById(jobId);
    if (!jobUpdate) {
        throw {
            status: 404,
            message: "Job update not found"
        };
    }
    return jobUpdate;
};



export const updateJobUpdateByIdService = async (updateId, userId, updateData) => {
    if (!mongoose.isValidObjectId(updateId)) {
        throw {
            status: 400,
            message: "Invalid update ID format"
        };
    }

    const updatedJobUpdate = await updateJobUpdateById(updateId, updateData, userId);
    
    if (!updatedJobUpdate) {
        throw {
            status: 404,
            message: "Job update not found or you don't have permission"
        };
    }

    return updatedJobUpdate;
};