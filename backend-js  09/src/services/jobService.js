import {
  countAllJobs,
  createJob,
  deleteJobById,
  findAllJobs,
  findJobByEmail,
  findJobById,
  updateJobById,
  userUpdateJobById
} from "../repositories/jobRepository.js";

export const createJobService = async (createJobObejct) => {
  const title = createJobObejct.title?.trim();
    const description = createJobObejct.description;
    const userId = createJobObejct.userId; 

    const job = await createJob(title, description, userId);

    return job;
}




export const getAllJobsService = async (offset = 0, limit = 10) => {
  const jobs = await findAllJobs(offset, limit);
  const totalDocuments = await countAllJobs();
  const totalPages = Math.ceil(totalDocuments / limit);

  return {
    jobs,
    totalPages,
    totalDocuments
  };
};

export const getJobByIdService = async (id) => {
  
  const job = await findJobById(id);
  
  if (!job) {
    throw {
      status: 404,
      message: "Job not found"
    };
  }

  return {
    job,
    
  };
};



export const getJobByEmailService = async (assignTo) => {
  const jobs = await findJobByEmail(assignTo); // Changed from findJobById
  
  if (!jobs || jobs.length === 0) {
    throw {
      status: 404,
      message: "No jobs found for this email"
    };
  }

  return {
    jobs  // Return array of jobs, not single job
  };
};


export const deleteJobService = async (id, userId) => {
  const job = await findJobById(id);
  
  if (!job) {
    throw {
      status: 404,
      message: "Job not found"
    };
  }

  if (job.userId.toString() !== userId.toString()) {
    throw {
      status: 403,
      message: "Unauthorized to delete this job"
    };
  }

  return await deleteJobById(id);
};

export const updateJobService = async (id, userId, updateData) => {
  const job = await findJobById(id);
  
  if (!job) {
    throw {
      status: 404,
      message: "Job not found"
    };
  }

  if (job.userId.toString() !== userId.toString()) {
    throw {
      status: 403,
      message: "Unauthorized to update this job"
    };
  }

  // Clean update data
  const cleanedUpdate = {
    ...updateData,
    title: updateData.title?.trim(),
    description: updateData.description?.trim(),
    assignTo: updateData.assignTo?.trim()
  };

  return await updateJobById(id, cleanedUpdate);
};


export const UserUpdateJobService = async (id, userId, updateData) => {
  const job = await findJobById(id);
  
  if (!job) {
    throw {
      status: 404,
      message: "Job not found"
    };
  }

  

  // Clean update data
  const cleanedUpdate = {
    ...updateData,
    title: updateData.title?.trim(),
    description: updateData.description?.trim(),
    assignTo: updateData.assignTo?.trim()
  };

  return await userUpdateJobById(id, cleanedUpdate);
};