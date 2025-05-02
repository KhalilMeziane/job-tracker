import { CreateJobTrackerValues } from "../../validators/create-job.schema";
import { UpdateJobTrackerValues } from "../../validators/update-job.schema";
import { IJobApplication } from "../entities/job.entity";
import { GetJobsParamsDTO } from "../../application/dtos/GetJobsParamsDTO";

export interface IJobRepository {
  create(userId: number, data: CreateJobTrackerValues): Promise<IJobApplication>;
  update(jobId: string, data: UpdateJobTrackerValues): Promise<IJobApplication>;
  delete(jobId: string): Promise<IJobApplication>;
  findById(jobId: string): Promise<IJobApplication | null>;
  findAllByUser(userId: number, params: GetJobsParamsDTO): Promise<IJobApplication[]>;
}
