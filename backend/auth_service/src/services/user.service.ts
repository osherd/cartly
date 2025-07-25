import { User } from '../entities/User';
import { IUserRepository } from '../interfaces/user/IUserRepository';
import { IUserService } from '../interfaces/user/IUserService';

export class UserService implements IUserService {

  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository
  }
  async changePassword(userData: any, newPassword: string, salt: string) {
    return this.repository.changePassword(userData.email, newPassword, salt);
  }
  async getUser(email: string): Promise<User> {
    return this.repository.findByEmail(email);
  }
  async getUserByEmail(email: string): Promise<User> {
    return this.repository.findByEmail(email)
  }
  async createUser(input: User) {
    return this.repository.create(input)
  }
  async updateUser(id: number, name: string) {
    return this.repository.update(id, name)
  }
  async getUsers(limit: number, offset: number) {

    return this.repository.find(limit, offset)
  }
  async getUserById(email: string) {
    return this.repository.findByEmail(email)
  }
  async deleteUserById(userId: string): Promise<void> {
    await this.repository.delete(userId)
  }
}
