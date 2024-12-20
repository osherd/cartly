import { IUserRepository } from '../interfaces/user/IUserRepository';
import { User } from '../entities/User';
export declare class UserRepository implements IUserRepository {
    private client;
    constructor();
    create({ email, password, id, resetToken, resetTokenExpiration, salt }: User): Promise<User>;
    update(userId: number, email: string): Promise<User>;
    findById(userId: string): Promise<User>;
    find(limit: number, offset: number): Promise<User[]>;
    delete(userId: string): Promise<User>;
}
