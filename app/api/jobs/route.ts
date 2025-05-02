import { JobService } from "@/modules/jobs/application/services/job.service"
import { ListJobsUseCase } from "@/modules/jobs/application/use-cases/list-jobs.usecase"
import { JobPrismaRepository } from "@/modules/jobs/infrastructure/repositories/job-prisma.repository"
import { JobServiceImpl } from "@/modules/jobs/infrastructure/services/job-impl.service"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const useCase = new ListJobsUseCase(
      new JobService(new JobPrismaRepository(), new JobServiceImpl(new JobPrismaRepository()))
    )
    const jobs = await useCase.execute(1)
    return NextResponse.json({ data: jobs }, { status: 201 })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}