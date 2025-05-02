"use server"

import { revalidatePath } from 'next/cache';

import { CreateJobUseCase } from "@/modules/jobs/application/use-cases/create-job.usecase";
import { JobService } from "@/modules/jobs/application/services/job.service";
import { JobPrismaRepository } from "@/modules/jobs/infrastructure/repositories/job-prisma.repository";
import { JobServiceImpl } from "@/modules/jobs/infrastructure/services/job-impl.service";
import { CreateJobTrackerSchema, CreateJobTrackerValues } from "@/modules/jobs/validators/create-job.schema";

export async function CreateJobTracker(body: CreateJobTrackerValues) {
  try {
    const { data, error } = CreateJobTrackerSchema.safeParse(body)
    if (error) {
      throw new Error("invalid inputs")
    }

    const useCase = new CreateJobUseCase(
      new JobService(new JobPrismaRepository(), new JobServiceImpl(new JobPrismaRepository()))
    )

    await useCase.execute(data)

    revalidatePath('/')

    return { success: true, message: "Job created successfully" }

  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: "something went wrong" }
    }
  }
}