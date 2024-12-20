import { Request, Response, NextFunction } from 'express'
import { GenerateSignature, ValidatePassword } from '../utils/password';
import { IUserService } from '../interfaces/user/IUserService';

export class UserController {
  private interactor: IUserService

  constructor(interactor: IUserService) {
    this.interactor = interactor

  }
  async onUserLogin(req: Request, res: Response, next: NextFunction): Promise<any> {
    const userInputs = req.body;
    const { password, id } = userInputs;
    try {
      const user = await this.interactor.getUserById(id);
      if (user) {
        const validation = await ValidatePassword(password, user.password, user.salt);

        if (validation) {

          const signature = await GenerateSignature({
            id: user.id,
            email: user.email,
          })

          return res.status(200).json({
            signature,
            email: user.email
          })
        }
      }
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}