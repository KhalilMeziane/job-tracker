import { JobService } from "../services/job.service"

export class DeleteJobUseCase {
  constructor(private readonly jobService: JobService) {}

  async execute(id: string): Promise<string> {
    return this.jobService.deleteJob(id)
  }
}
