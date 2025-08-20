import { z } from 'zod';

export const zodJobSchema = z.object({
    title: z.string({
        required_error: "Job title is required",
        invalid_type_error: "Job title must be a string"
    })
    .min(5, { message: "Job title must be at least 5 characters long" })
    .max(100, { message: "Job title cannot exceed 100 characters" })
    .trim(),
    
    description: z.string({
        required_error: "Job description is required",
        invalid_type_error: "Job description must be a string"
    })
    .min(10, { message: "Job description must be at least 10 characters long" })
    .max(1000, { message: "Job description cannot exceed 1000 characters" })
    .trim(),
    
    
}).strict();