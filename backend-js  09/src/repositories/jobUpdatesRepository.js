import JobUpdate from "../schema/jobupdates.js";
import JobUpdateId from "../schema/job.js";

export const createJobUpdate = async ({ title, userId, description, jobId }) => {
    const jobUpdate = await JobUpdate.create({ 
        title, 
        userId, 
        description,
        jobId
    });
    return jobUpdate;
};


export const findJobUpdateById = async (jobId) => {
    return await JobUpdate.find({ jobId })
                         .sort({ createdAt: -1 }) // Newest first
                         .exec();
};



export const updateJobUpdateById = async (updateId, updateData, userId) => {
    return await JobUpdate.findOneAndUpdate(
        { 
            _id: updateId,
            userId  // Ensures only the owner can update
        },
        updateData,
        { new: true, runValidators: true } // Returns updated doc + validates data
    ).exec();
};