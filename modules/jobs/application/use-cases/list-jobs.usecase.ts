import { IJobApplication } from "../../domain/entities/job.entity";
import { JobService } from "../services/job.service";

export class ListJobsUseCase {
  constructor(private readonly jobService: JobService) { }

  async execute(userId: number): Promise<IJobApplication[]> {
    return this.jobService.listJobsForUser(userId);
  }
}
