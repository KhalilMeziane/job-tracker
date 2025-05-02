import { IJobApplication } from "../../domain/entities/job.entity";
import { CreateJobTrackerValues } from "../../validators/create-job.schema";
import { UpdateJobTrackerValues } from "../../validators/update-job.schema";
import { IJobService } from "../../domain/ports/job-service.interface";
import { IJobRepository } from "../../domain/ports/job-repository.interface";

export class JobServiceImpl implements IJobService {
  private jobRepository: IJobRepository;

  constructor(jobRepository: IJobRepository) {
    this.jobRepository = jobRepository;
  }

  async createJob(userId: number, body: CreateJobTrackerValues): Promise<IJobApplication> {
    const job = await this.jobRepository.create(userId, body);
    return job;
  }

  async getJobById(id: string): Promise<IJobApplication> {
    const job = await this.jobRepository.findById(id);
    if (!job) {
      throw new Error("Job not found");
    }
    return job;
  }

  async listJobsForUser(userId: number): Promise<IJobApplication[]> {
    const jobs = await this.jobRepository.findAllByUser(userId);
    return jobs;
  }

  async updateJob(id: string, body: UpdateJobTrackerValues): Promise<IJobApplication> {
    const updatedJob = await this.jobRepository.update(id, {
      company: body.company,
      position: body.position,
      location: body.location,
      status: body.status,
      dateApplied: body.dateApplied,
      url: body.url,
    });

    return updatedJob;
  }

  async deleteJob(id: string): Promise<string> {
    await this.jobRepository.delete(id);
    return id;
  }
}
