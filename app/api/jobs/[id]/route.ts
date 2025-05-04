import { NextApiRequest } from "next"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { AuthImplService } from "@/modules/auth/infrastructure/services/auth-impl.service"
import { JobService } from "@/modules/jobs/application/services/job.service"
import { JobPrismaRepository } from "@/modules/jobs/infrastructure/repositories/job-prisma.repository"
import { JobServiceImpl } from "@/modules/jobs/infrastructure/services/job-impl.service"
import { GetJobUseCase } from "@/modules/jobs/application/use-cases/get-job.usecase"

export async function GET(req: NextApiRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value
    let userId: number | null = null

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const auth = new AuthImplService()

    try {
      const verification = auth.verifyToken(token) as { userId: number }
      userId = verification?.userId
    } catch {
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
