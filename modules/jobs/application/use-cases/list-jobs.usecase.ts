import { IJobApplication } from "../../domain/entities/job.entity";
import { JobService } from "../services/job.service";
import { GetJobsParamsDTO } from "../dtos/GetJobsParamsDTO";

export class ListJobsUseCase {
  constructor(private readonly jobService: JobService) { }

  async execute(userId: number, params: GetJobsParamsDTO): Promise<IJobApplication[]> {
    return this.jobService.listJobsForUser(userId, params);
  }
}
