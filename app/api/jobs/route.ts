import { NextApiRequest } from "next"
import { NextResponse } from "next/server"
import { JobService } from "@/modules/jobs/application/services/job.service"
import { ListJobsUseCase } from "@/modules/jobs/application/use-cases/list-jobs.usecase"
import { JobPrismaRepository } from "@/modules/jobs/infrastructure/repositories/job-prisma.repository"
import { JobServiceImpl } from "@/modules/jobs/infrastructure/services/job-impl.service"
import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server"

import { ApplicationStatus } from "@/lib/generated/prisma"
import { isAuthenticatedUser } from "@/lib/isAuthenticatedUser"
import { AppError } from "@/lib/errors"

export async function GET(req: NextApiRequest) {
  try {
    const { searchParams } = new URL(req.url ?? "")
    const { isAuthenticated, userId } = await isAuthenticatedUser()

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const queryParams = createLoader({
      job: parseAsString.withDefault(""),
      status: parseAsStringEnum<ApplicationStatus>(
        Object.values(ApplicationStatus)
      ).withDefault(ApplicationStatus.APPLIED),
      page: parseAsInteger.withDefault(1),
    })(searchParams)

    const useCase = new ListJobsUseCase(
      new JobService(
        new JobPrismaRepository(),
        new JobServiceImpl(new JobPrismaRepository())
      )
    )
    const results = await useCase.execute(userId, {
      status: queryParams.status,
      job: queryParams.job,
      page: queryParams.page,
    })
    return NextResponse.json({ data: results }, { status: 200 })
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
