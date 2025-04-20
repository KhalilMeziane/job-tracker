"use server"

import { cookies } from "next/headers"
import { AuthService } from "@/modules/auth/application/services/auth.service"
import { LoginUseCase } from "@/modules/auth/application/use-cases/login.use-case"
import { UserPrismaRepository } from "@/modules/auth/infrastructure/repositories/user-prisma.repository"
import { AuthImplService } from "@/modules/auth/infrastructure/services/auth-impl.service"
import { loginSchema } from "@/modules/auth/validators/login.schema"

export async function login(body: { email: string; password: string }) {
  try {
    const { data, error } = loginSchema.safeParse(body)
    if (error) {
      throw new Error("invalid inputs")
    }
    const { email, password } = data

    const useCase = new LoginUseCase(
      new AuthService(new UserPrismaRepository(), new AuthImplService())
    )
    const token = await useCase.execute(email, password)

    cookies().set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 86400,
      path: "/",
    })

    return { success: true, message: "sign-in successful" }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message }
    } else {
      return { success: false, message: "something went wrong" }
    }
  }
}
