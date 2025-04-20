import { NextResponse } from "next/server"
import { AuthService } from "@/modules/auth/application/services/auth.service"
import { RegisterUseCase } from "@/modules/auth/application/use-cases/register.use-case"
import { UserPrismaRepository } from "@/modules/auth/infrastructure/repositories/user-prisma.repository"
import { AuthImplService } from "@/modules/auth/infrastructure/services/auth-impl.service"
import { registerSchema } from "@/modules/auth/validators/register.schema"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { data, error } = registerSchema.safeParse(body)
    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }
    const { email, password, name } = data

    const useCase = new RegisterUseCase(
      new AuthService(new UserPrismaRepository(), new AuthImplService())
    )

    const token = await useCase.execute(name, email, password)

    const response = NextResponse.json({}, { status: 201 })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    })
    return response

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
