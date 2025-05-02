import { ApplicationStatus } from "@/lib/generated/prisma";
import { IJobApplication } from "../../domain/entities/job.entity";
import { JobService } from "../services/job.service";

export class ListJobsUseCase {
  constructor(private readonly jobService: JobService) { }

  async execute(userId: number, { status, job }: { status: ApplicationStatus, job: string }): Promise<IJobApplication[]> {
    return this.jobService.listJobsForUser(userId, { status, job });
  }
}
