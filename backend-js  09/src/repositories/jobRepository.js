import Job from "../schema/job.js";


export const createJob = async (title, description, userId) => {
    try {
    const job = await Job.create({ 
        title, 
        description, 
        userId,
        assignTo: "na",
        accepted: "false",
        status: "open"  // ADDED
    });
    return  job;
    } catch(error) {
        console.log(error);
    }
}

export const findAllJobs = async (offset = 0, limit = 10) => {
    return await Job.find()
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate('userId', 'username email _id')
        .exec();
};

export const countAllJobs = async () => {
    return await Job.countDocuments().exec();
};

export const findJobById = async (id) => {
    return await Job.findById(id).exec();
};




export const findJobByEmail = async (assignTo) => {

return await Job.find({ assignTo })
                         .sort({ createdAt: -1 }) // Newest first
                         .exec();

    
};

export const deleteJobById = async (id) => {
    return await Job.findByIdAndDelete(id).exec();
};

export const updateJobById = async (id, updateData) => {
    return await Job.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true }
    ).exec();
};


export const userUpdateJobById = async (id, updateData) => {
    return await Job.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true }
    ).exec();
};