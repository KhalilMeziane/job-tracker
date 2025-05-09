"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { JobService } from "@/modules/jobs/application/services/job.service"
import { CreateJobUseCase } from "@/modules/jobs/application/use-cases/create-job.usecase"
import { JobPrismaRepository } from "@/modules/jobs/infrastructure/repositories/job-prisma.repository"
import { JobServiceImpl } from "@/modules/jobs/infrastructure/services/job-impl.service"
import {
  CreateJobTrackerSchema,
  CreateJobTrackerValues,
  UpdateJobTrackerValues
} from "@/modules/jobs/validators/create-job.schema"
import { UpdateJobUseCase } from "@/modules/jobs/application/use-cases/update-job.usecase"
import { DeleteJobUseCase } from "@/modules/jobs/application/use-cases/delete-job.usecase"
import { isAuthenticatedUser } from "@/lib/isAuthenticatedUser"

export async function CreateJobTracker(body: CreateJobTrackerValues) {
  try {
    const { data, error } = CreateJobTrackerSchema.safeParse(body)
    if (error) {
      throw new Error("invalid inputs")
    }

    const { isAuthenticated, userId } = await isAuthenticatedUser()

    if (!isAuthenticated) {
      redirect("/sign-in")
    }

    const useCase = new CreateJobUseCase(
      new JobService(
        new JobPrismaRepository(),
        new JobServiceImpl(new JobPrismaRepository())
      )
    )

    await useCase.execute(data, userId)

    revalidatePath("/")

    return { success: true, message: "Job created successfully" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: "something went wrong" }
    }
  }
}

export async function UpdateJobTracker(id: string, body: UpdateJobTrackerValues) {
  try {
    const { data, error } = CreateJobTrackerSchema.safeParse(body)
    if (error) {
      throw new Error("invalid inputs")
    }

    const { isAuthenticated, userId } = await isAuthenticatedUser()

    if (!isAuthenticated) {
      redirect("/sign-in")
    }

    const useCase = new UpdateJobUseCase(
      new JobService(
        new JobPrismaRepository(),
        new JobServiceImpl(new JobPrismaRepository())
      )
    )

    await useCase.execute(id, data, userId)

    revalidatePath("/")

    return { success: true, message: "Job updated successfully" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: "something went wrong" }
    }
  }
}

export async function DeleteJobTracker(id: string) {
  try {
    const { isAuthenticated, userId } = await isAuthenticatedUser()

    if (!isAuthenticated) {
      redirect("/sign-in")
    }

    const useCase = new DeleteJobUseCase(
      new JobService(
        new JobPrismaRepository(),
        new JobServiceImpl(new JobPrismaRepository())
      )
    )

    await useCase.execute(id, userId)

    revalidatePath(`/${id}`);
    revalidatePath(`/`);

    return { success: true, message: "Job deleted successfully" }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: "something went wrong" }
    }
  }
}
