import { IJobRepository } from "../../domain/ports/job-repository.interface"
import { IJobApplication } from "../../domain/entities/job.entity"
import { CreateJobTrackerValues } from "../../validators/create-job.schema"
import { UpdateJobTrackerValues } from "../../validators/update-job.schema"

import prisma from "@/lib/prisma"
import { ApplicationStatus } from "@/lib/generated/prisma"

export class JobPrismaRepository implements IJobRepository {
  async create(userId: number, data: CreateJobTrackerValues): Promise<IJobApplication> {
    const { company, dateApplied, location, position, status, notes, url } = data
    return prisma.jobApplication.create({
      data: {
        company,
        dateApplied,
        location,
        position,
        status,
        notes: notes ?? '',
        userId,
        applicationLink: url
      }
    })
  }
  async update(jobId: string, data: UpdateJobTrackerValues): Promise<IJobApplication> {
    return prisma.jobApplication.update({ where: { id: jobId }, data })
  }
  async delete(jobId: string): Promise<IJobApplication> {
    return prisma.jobApplication.delete({ where: { id: jobId } })
  }
  async findById(jobId: string): Promise<IJobApplication | null> {
    return prisma.jobApplication.findUnique({ where: { id: jobId } })
  }
  async findAllByUser(userId: number, { status }: { status: ApplicationStatus }): Promise<IJobApplication[]> {
    return prisma.jobApplication.findMany({ where: { userId, status } })
  }
}
