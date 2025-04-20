import { IAuthService } from "@/modules/auth/domain/ports/auth-service.interface"
import { IUserRepository } from "@/modules/auth/domain/ports/user-repository.interface"

export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService
  ) {}

  async register(name: string, email: string, password: string) {
    const existing = await this.userRepository.findByEmail(email)
    if (existing) throw new Error("Email already in use")

    const hashed = await this.authService.hashPassword(password)
    const user = await this.userRepository.create({
      name,
      email,
      password: hashed,
    })

    return this.authService.generateToken({ userId: user.id })
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new Error("Invalid credentials")

    const isMatch = await this.authService.comparePasswords(
      password,
      user.password
    )
    if (!isMatch) throw new Error("Invalid credentials")

    return this.authService.generateToken({ userId: user.id })
  }
}
