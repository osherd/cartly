import { IUserRepository } from '../interfaces/user/IUserRepository';
import { IUserService } from '../interfaces/user/IUserService';

export class UserService implements IUserService {

  private repository: IUserRepository;
  constructor(repository: IUserRepository) {
    this.repository = repository
  }
  updateUser(id: number, name: string) {
    return this.repository.update(id, name)
  }
  async createUser(input: any) {

    return this.repository.create(input)
  }
  getUsers(limit: number, offset: number) {

    return this.repository.find(limit, offset)
  }
  getUser(userId: string) {
    return this.repository.findByEmail(userId)
  }
  getUserByEmail(email: string) {
    return this.repository.findByEmail(email)
  }
  deleteUserById(userId: string) {
    return this.repository.delete(userId)
  }
}
