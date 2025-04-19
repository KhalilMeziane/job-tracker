import { IUser } from "../entities/user.entity";

export interface IUserRepository {
  create(user: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
