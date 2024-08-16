import { User } from "../../domain/entities/user";

export interface IUserRepository {
  create(data: User): Promise<User>
  update(data: User): Promise<void>
  delete(id: string): Promise<void>
  findMany(): Promise<User[]>
  findById(params: any): Promise<User>
  findByEmail(email: string): Promise<User>
}