import { IJobApplication } from "../../domain/entities/job.entity"
import { IJobRepository } from "../../domain/ports/job-repository.interface"
import { IJobService } from "../../domain/ports/job-service.interface"
import { CreateJobTrackerValues } from "../../validators/create-job.schema"
import { UpdateJobTrackerValues } from "../../validators/update-job.schema"
import { GetJobsParamsDTO } from "../dtos/GetJobsParamsDTO"

export class JobService {
  constructor(
    private readonly jobRepository: IJobRepository,
    private readonly jobService: IJobService
  ) {}

  async createJob(
    userId: number,
    body: CreateJobTrackerValues
  ): Promise<IJobApplication> {
    return this.jobService.createJob(userId, body)
  }

  async getJobById(id: string): Promise<IJobApplication> {
    return this.jobService.getJobById(id)
  }

  async listJobsForUser(
    userId: number,
    params: GetJobsParamsDTO
  ): Promise<IJobApplication[]> {
    return this.jobService.listJobsForUser(userId, params)
  }

  async updateJob(
    id: string,
    body: UpdateJobTrackerValues
  ): Promise<IJobApplication> {
    return this.jobService.updateJob(id, body)
  }

  async deleteJob(id: string): Promise<string> {
    return this.jobService.deleteJob(id)
  }
}
