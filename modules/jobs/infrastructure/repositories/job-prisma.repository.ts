import { IJobRepository } from "../../domain/ports/job-repository.interface"
import { IJobApplication } from "../../domain/entities/job.entity"
import { CreateJobTrackerValues } from "../../validators/create-job.schema"
import { UpdateJobTrackerValues } from "../../validators/update-job.schema"

import prisma from "@/lib/prisma"

export class JobPrismaRepository implements IJobRepository {
  async create(userId: number, data: CreateJobTrackerValues): Promise<IJobApplication> {
    return prisma.jobApplication.create({
      data: {
        ...data,
        notes: data.notes ?? '',
        userId,
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
  async findAllByUser(userId: number): Promise<IJobApplication[]> {
    return prisma.jobApplication.findMany({ where: { userId } })
  }
}
