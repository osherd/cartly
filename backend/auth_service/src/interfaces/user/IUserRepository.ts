import { User } from '../../entities/User';
export interface IUserRepository {
  create(data: User): Promise<User>;
  update(id: number, name: string): Promise<User>;
  changePassword(email: string, newPassword: string, salt: string): Promise<User>;
  find(limit: number, offset: number): Promise<User[]>;
  findByEmail(userId: string): Promise<User>;
  delete(userId: string): Promise<User>;
}