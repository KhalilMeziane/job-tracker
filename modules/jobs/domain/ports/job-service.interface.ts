import { CreateJobTrackerValues } from "../../validators/create-job.schema"
import { UpdateJobTrackerValues } from "../../validators/update-job.schema"
import { IJobApplication } from "../entities/job.entity"
import { GetJobsParamsDTO } from "../../application/dtos/GetJobsParamsDTO"

export interface IJobService {
  createJob(userId: number, body: CreateJobTrackerValues): Promise<IJobApplication>
  getJobById(id: string): Promise<IJobApplication>
  listJobsForUser(userId: number, params: GetJobsParamsDTO): Promise<IJobApplication[]>
  updateJob(id: string, body: UpdateJobTrackerValues): Promise<IJobApplication>
  deleteJob(id: string): Promise<string>
}
