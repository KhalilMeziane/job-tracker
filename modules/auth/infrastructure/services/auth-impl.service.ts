import { compare, hash } from "bcrypt-ts";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IAuthService } from "../../domain/ports/auth-service.interface";

export class AuthImplService implements IAuthService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  generateToken(payload: { userId: number }): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
  }

  verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
