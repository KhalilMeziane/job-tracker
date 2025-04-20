import { IUser } from "@/modules/auth/domain/entities/user.entity"

import prisma from "@/lib/prisma"

import { IUserRepository } from "../../domain/ports/user-repository.interface"

export class UserPrismaRepository implements IUserRepository {
  async create(
    user: Omit<IUser, "id" | "createdAt" | "updatedAt">
  ): Promise<IUser> {
    return prisma.user.create({ data: user })
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { email } })
  }
}
