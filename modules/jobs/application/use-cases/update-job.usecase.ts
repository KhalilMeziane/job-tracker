import { IJobApplication } from "../../domain/entities/job.entity"
import { UpdateJobTrackerValues } from "../../validators/update-job.schema"
import { JobService } from "../services/job.service"

export class UpdateJobUseCase {
  constructor(private readonly jobService: JobService) { }

  async execute(
    id: string,
    body: UpdateJobTrackerValues,
    userId: number
  ): Promise<IJobApplication> {
    return this.jobService.updateJob(id, body, userId)
  }
}
