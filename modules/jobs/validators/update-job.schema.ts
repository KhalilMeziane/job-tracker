import { z } from "zod";
import { CreateJobTrackerSchema } from "./create-job.schema";

export const UpdateJobTrackerSchema = CreateJobTrackerSchema

export type UpdateJobTrackerValues = z.infer<typeof CreateJobTrackerSchema>