import { AuthImplService } from "@/modules/auth/infrastructure/services/auth-impl.service"
import { JobService } from "@/modules/jobs/application/services/job.service"
import { ListJobsUseCase } from "@/modules/jobs/application/use-cases/list-jobs.usecase"
import { JobPrismaRepository } from "@/modules/jobs/infrastructure/repositories/job-prisma.repository"
import { JobServiceImpl } from "@/modules/jobs/infrastructure/services/job-impl.service"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    let userId: number | null = null

    if (!token) {
      redirect('/sign-in')
    }
    const auth = new AuthImplService()

    try {
      const verification = auth.verifyToken(token) as { userId: number }
      userId = verification?.userId
    } catch {
      redirect('/ai/login')
    }
    const useCase = new ListJobsUseCase(
      new JobService(new JobPrismaRepository(), new JobServiceImpl(new JobPrismaRepository()))
    )
    const jobs = await useCase.execute(userId)
    return NextResponse.json({ data: jobs }, { status: 201 })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}