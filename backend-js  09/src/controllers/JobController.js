import { 
  createJobService, 
  deleteJobService, 
  getAllJobsService, 
  getJobByIdService, 
  updateJobService,
  getJobByEmailService, 
  UserUpdateJobService
} from '../services/jobService.js';


export async function createJob(req, res) {
    try {
        const { title, description } = req.body;  // 1. Uncommented destructuring
        const userId = req.user?._id;

        // 2. Separate validations
        if (!title?.trim()) throw { status: 400, message: "Title required" };
        if (!description?.trim()) throw { status: 400, message: "Description required" };
        if (!userId) throw { status: 401, message: "Authentication required" };  // 3. User check

        const job = await createJobService({ 
            title: title.trim(),
            description: description.trim(),
            userId
        });

        return res.status(201).json({
            success: true,
            message: "Job created",
            data: job
        });
    } catch (error) {
        console.error("Job creation error:", error);  // 5. Better logging
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal error"
        });
    }
}

//==================================================================================================================>
export async function getAllJobs(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const { jobs, totalPages, totalDocuments } = await getAllJobsService(offset, limit);

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: {
                jobs,
                pagination: {
                    currentPage: Math.floor(offset / limit) + 1,
                    totalPages,
                    totalItems: totalDocuments,
                    itemsPerPage: limit
                }
            }
        });
    } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    return res.status(status).json({
        success: false,
        message
    });
}
}


//==================================================================>
    export async function getJobById(req, res) {
    try {
        const jobId = req.params.id;
        

        const { job } = await getJobByIdService(jobId);

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: {
                job
            
            }
        });
    } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    return res.status(status).json({
        success: false,
        message
    });
}
}
//==================================================================>    

//==================================================================>
    export async function getJobByEmail(req, res) {
    try {
        const assignTo = req.params.email;
        const { jobs } = await getJobByEmailService(assignTo);

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: {
                jobs  // Changed from singular 'job' to plural 'jobs'
            }
        });
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
}
//==================================================================>     

export async function deleteJob(req, res) {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;

        const deletedJob = await deleteJobService(jobId, userId);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
            data: deletedJob
        });
    } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    return res.status(status).json({
        success: false,
        message
    });
}
}

export async function updateJob(req, res) {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;
        const updateData = req.body;

        const updatedJob = await updateJobService(jobId, userId, updateData);

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob
        });
    } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    return res.status(status).json({
        success: false,
        message
    });
}
}


export async function userUpdateJob(req, res) {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;
        const updateData = req.body;

        const updatedJob = await UserUpdateJobService(jobId, userId, updateData);

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob
        });
    } catch (error) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    return res.status(status).json({
        success: false,
        message
    });
}
}