import { createJobUpdateService, findJobUpdateByIdService, updateJobUpdateByIdService } from "../services/jobUpdateService.js";

export async function createJobUpdate(req, res) {
    try {
        const { title, description, jobId } = req.body;
        const userId = req.user._id;

        if (!title?.trim() || !description?.trim()) {
            throw {
                status: 400,
                message: "Title and description are required"
            };
        }

        if (!jobId) {
            throw {
                status: 400,
                message: "Job ID is required"
            };
        }

        const jobUpdate = await createJobUpdateService(
            title.trim(),
            userId,
            description.trim(),
            jobId
        );

        return res.status(201).json({
            success: true,
            message: "Job update created successfully",
            data: jobUpdate
        });
    } catch (error) {
        console.error('Create Job Update Error:', error);
        const status = error.status || 500;
        const message = error.message || "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
}

export async function getJobUpdateById(req, res) {
    try {
        const jobUpdateId = req.params.jobId;
        const jobUpdate = await findJobUpdateByIdService(jobUpdateId);

        return res.status(200).json({
            success: true,
            message: "Job update retrieved successfully",
            data: jobUpdate
        });
    } catch (error) {
        console.error('Get Job Update Error:', error);
        const status = error.status || 500;
        const message = error.message || "Internal server error";
        return res.status(status).json({
            success: false,
            message
        });
    }
}



export async function updateJobUpdate(req, res) {
    try {
        const updateId = req.params.updateId; // Changed from jobId to updateId
        const userId = req.user._id;
        const { title, description } = req.body;

        // Validate at least one field is provided
        if (!title?.trim() && !description?.trim()) {
            throw {
                status: 400,
                message: "At least title or description must be provided"
            };
        }

        const updateData = {
            ...(title && { title: title.trim() }),
            ...(description && { description: description.trim() })
        };

        const updatedJobUpdate = await updateJobUpdateByIdService(
            updateId, 
            userId,
            updateData
        );

        return res.status(200).json({
            success: true,
            message: "Job update updated successfully",
            data: updatedJobUpdate
        });
    } catch (error) {
        const status = error.status || 500;
        return res.status(status).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}