import { AuthService } from "../services/auth.service";

export class RegisterUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(name:string, email: string, password: string) {
    return this.authService.register(name, email, password);
  }
}
