export interface IUserService {
  getUserByEmail(email: any): unknown;
  createUser(userData: any): any;
  changePassword(email: string, newPassword: string, salt: string): any;
  getUsers(limit: number, offset: number): any;
  getUser(email: string): any;
  deleteUserById(id: string): any;
  updateUser(id: number, data: any): any;
}

