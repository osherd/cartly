import { User } from '../../entities/User';

export interface IUserService {
  createUser(userData: User): any;
  getUsers(limit: number, offset: number): any;
  getUserById(id: string): any;
  deleteUserById(id: string): any;
  updateUser(id: number, data: any): any;
}
