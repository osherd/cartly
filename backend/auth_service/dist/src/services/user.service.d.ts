import { IUserRepository } from '../interfaces/user/IUserRepository';
import { IUserService } from '../interfaces/user/IUserService';
export declare class UserService implements IUserService {
    private repository;
    constructor(repository: IUserRepository);
    updateUser(id: number, name: string): Promise<import("../entities/User").User>;
    createUser(input: any): Promise<import("../entities/User").User>;
    getUsers(limit: number, offset: number): Promise<import("../entities/User").User[]>;
    getUserById(userId: string): Promise<import("../entities/User").User>;
    getUserByEmail(email: string): Promise<import("../entities/User").User>;
    deleteUserById(userId: string): Promise<import("../entities/User").User>;
}
