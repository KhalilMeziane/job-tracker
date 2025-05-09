import { NextApiRequest } from "next"
import { NextResponse } from "next/server"
import { JobService } from "@/modules/jobs/application/services/job.service"
import { JobPrismaRepository } from "@/modules/jobs/infrastructure/repositories/job-prisma.repository"
import { JobServiceImpl } from "@/modules/jobs/infrastructure/services/job-impl.service"
import { GetJobUseCase } from "@/modules/jobs/application/use-cases/get-job.usecase"
import { isAuthenticatedUser } from "@/lib/isAuthenticatedUser"

export async function GET(req: NextApiRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const { isAuthenticated, userId } = await isAuthenticatedUser()

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const useCase = new GetJobUseCase(
      new JobService(
        new JobPrismaRepository(),
        new JobServiceImpl(new JobPrismaRepository())
      )
    )
    const results = await useCase.execute(id, userId)
    return NextResponse.json({ data: results }, { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
