import { cookies } from "next/headers"
import { AuthImplService } from "@/modules/auth/infrastructure/services/auth-impl.service"

export const isAuthenticatedUser = async (): Promise<{
  isAuthenticated: boolean
  userId: number
}> => {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value
  if (!token) {
    return {
      isAuthenticated: false,
      userId: 0,
    }
  }

  try {
    const auth = new AuthImplService()
    const { userId } = auth.verifyToken(token) as { userId: number }
    return {
      isAuthenticated: true,
      userId,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      isAuthenticated: false,
      userId: 0,
    }
  }
}
