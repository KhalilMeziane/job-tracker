import { CreateJobTrackerValues } from "../../validators/create-job.schema"
import { UpdateJobTrackerValues } from "../../validators/update-job.schema"
import { IJobApplication } from "../entities/job.entity"
import { GetJobsParamsType } from "../types/GetJobsParamsType"

export interface IJobRepository {
  create(userId: number, data: CreateJobTrackerValues): Promise<IJobApplication>
  update(jobId: string, data: UpdateJobTrackerValues, userId: number): Promise<IJobApplication>
  delete(jobId: string, userId: number): Promise<IJobApplication>
  findById(jobId: string, userId: number): Promise<IJobApplication>
  findAllByUser(
    userId: number,
    params: GetJobsParamsType
  ): Promise<{ jobs: IJobApplication[]; totalCount: number }>
}
