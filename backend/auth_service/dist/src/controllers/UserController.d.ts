import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/user/IUserService';
export declare class UserController {
    private interactor;
    constructor(interactor: IUserService);
    onUserLogin(req: Request, res: Response, next: NextFunction): Promise<any>;
}
