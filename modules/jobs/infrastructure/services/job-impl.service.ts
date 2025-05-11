import { handlePrismaError } from "@/lib/prismaErrorHandler"
import { GetJobsParamsDTO } from "../../application/dtos/GetJobsParamsDTO"
import { IJobApplication } from "../../domain/entities/job.entity"
import { IJobRepository } from "../../domain/ports/job-repository.interface"
import { IJobService } from "../../domain/ports/job-service.interface"
import { CreateJobTrackerValues } from "../../validators/create-job.schema"
import { UpdateJobTrackerValues } from "../../validators/update-job.schema"

export class JobServiceImpl implements IJobService {
  private jobRepository: IJobRepository

  constructor(jobRepository: IJobRepository) {
    this.jobRepository = jobRepository
  }

  async createJob(
    userId: number,
    body: CreateJobTrackerValues
  ): Promise<IJobApplication> {
    try {
      return await this.jobRepository.create(userId, body)
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async getJobById(id: string, userId: number): Promise<IJobApplication> {
    try {
      return await this.jobRepository.findById(id, userId)
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async listJobsForUser(
    userId: number,
    params: GetJobsParamsDTO
  ): Promise<{ jobs: IJobApplication[]; totalCount: number }> {
    try {
      return await this.jobRepository.findAllByUser(userId, params)
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async updateJob(
    id: string,
    body: UpdateJobTrackerValues,
    userId: number
  ): Promise<IJobApplication> {
    try {
      return await this.jobRepository.update(id, body, userId)
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async deleteJob(id: string, userId: number): Promise<IJobApplication> {
    try {
      return await this.jobRepository.delete(id, userId)
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
