import { IJobApplication } from "../../domain/entities/job.entity";
import { CreateJobTrackerValues } from "../../validators/create-job.schema";
import { JobService } from "../services/job.service";

export class CreateJobUseCase {
  constructor(private readonly jobService: JobService) { }

  async execute(body: CreateJobTrackerValues): Promise<IJobApplication> {
    const userId = 1
    return this.jobService.createJob(userId, body);
  }
}