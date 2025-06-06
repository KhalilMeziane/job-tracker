import prisma from "@/lib/prisma"

import { GetJobsParamsDTO } from "../../application/dtos/GetJobsParamsDTO"
import { IJobApplication } from "../../domain/entities/job.entity"
import { IJobRepository } from "../../domain/ports/job-repository.interface"
import { CreateJobTrackerValues } from "../../validators/create-job.schema"
import { UpdateJobTrackerValues } from "../../validators/update-job.schema"

export class JobPrismaRepository implements IJobRepository {
  async create(
    userId: number,
    data: CreateJobTrackerValues
  ): Promise<IJobApplication> {
    const { company, dateApplied, location, position, status, notes, url } =
      data
    return prisma.jobApplication.create({
      data: {
        company,
        dateApplied,
        location,
        position,
        status,
        notes: notes ?? "",
        userId,
        applicationLink: url,
      },
    })
  }
  async update(
    jobId: string,
    data: UpdateJobTrackerValues,
    userId: number
  ): Promise<IJobApplication> {
    const { company, dateApplied, location, position, status, notes, url } =
      data
    return prisma.jobApplication.update({
      where: { id: jobId, userId }, data: {
        company,
        dateApplied,
        location,
        position,
        status,
        notes: notes ?? "",
        userId,
        applicationLink: url,
      },
    })
  }
  async delete(jobId: string, userId: number): Promise<IJobApplication> {
    return prisma.jobApplication.delete({ where: { id: jobId, userId } })
  }
  async findById(jobId: string, userId: number): Promise<IJobApplication> {
    return prisma.jobApplication.findFirstOrThrow({ where: { id: jobId, userId } })
  }
  async findAllByUser(
    userId: number,
    { status, job, page }: GetJobsParamsDTO
  ): Promise<{ jobs: IJobApplication[]; totalCount: number }> {
    const jobs = await prisma.jobApplication.findMany({
      where: {
        userId,
        status,
        ...(job.length > 0 && {
          position: { contains: job, mode: "insensitive" },
        }),
      },
      skip: page ? (page - 1) * 10 : undefined,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    })
    const totalCount = await prisma.jobApplication.count({
      where: {
        userId,
        status,
        ...(job.length > 0 && {
          position: { contains: job, mode: "insensitive" },
        }),
      },
    })

    return { jobs, totalCount }
  }
}
