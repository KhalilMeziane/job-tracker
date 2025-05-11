import { IJobApplication } from "../../domain/entities/job.entity";
import { GetJobsParamsDTO } from "../dtos/GetJobsParamsDTO";
import { JobService } from "../services/job.service";

export class ListJobsUseCase {
  constructor(private readonly jobService: JobService) { }

  async execute(
    userId: number,
    params: GetJobsParamsDTO
  ): Promise<{ jobs: IJobApplication[]; totalCount: number }> {
    return this.jobService.listJobsForUser(userId, params)
  }
}
