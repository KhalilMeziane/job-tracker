import { IUser } from "@/modules/auth/domain/entities/user.entity";
import { IUserRepository } from "../../domain/ports/user-repository.interface";
import prisma from "@/lib/prisma";

export class UserPrismaRepository implements IUserRepository {
  async create(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    return prisma.user.create({ data: user });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}
