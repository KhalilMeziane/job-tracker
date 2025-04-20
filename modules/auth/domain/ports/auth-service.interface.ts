import { JwtPayload } from "jsonwebtoken"

export interface IAuthService {
  hashPassword(password: string): Promise<string>
  comparePasswords(password: string, hash: string): Promise<boolean>
  generateToken(payload: { userId: number }): string
  verifyToken(token: string): string | JwtPayload
}
