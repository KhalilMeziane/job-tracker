import { IJobApplication } from "../../domain/entities/job.entity"
import { JobService } from "../services/job.service"

export class GetJobUseCase {
  constructor(private readonly jobService: JobService) { }

  async execute(id: string, userId: number): Promise<IJobApplication> {
    return this.jobService.getJobById(id, userId)
  }
}
