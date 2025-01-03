import { Request, Response, NextFunction } from 'express';

import { IUserService } from '../interfaces/user/IUserService';
import { generatePassword, generateSalt, generateSignature, validatePassword } from '../utils/password';

export class UserController {
  private interactor: IUserService

  constructor(interactor: IUserService) {
    this.interactor = interactor
  }

  async onUserSignup(req: Request, res: Response, next: NextFunction) {
    try {
      const userInputs = req.body;

      const { password, email, name } = userInputs;
      const salt = await generateSalt();
      const userPassword = await generatePassword(password, salt);
      const existingUser = await this.interactor.getUser(email);

      if (existingUser) {
        return res.status(400).json({ message: 'User already exist!' });
      }

      const body: any = req.body;
      body.password = userPassword;
      body.salt = salt;
      body.name = name;
      const result = await this.interactor.createUser(body);

      //Generate the Signature
      const signature = await generateSignature({
        id: result.id,
        email: result.email,
      })


      // Set the token in cookies
      res.cookie('token', signature, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      // Send the result
      return res.status(201).json({ signature, email: result.email })
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onUserLogin(req: Request, res: Response, next: NextFunction) {
    const userInputs = req.body;
    const { email, password } = userInputs;
    try {
      const user = await this.interactor.getUser(email);
      if (user) {
        const validation = await validatePassword(password, user.password, user.salt);

        if (validation) {
          const signature = await generateSignature({
            email: user.email,
          })


          req.headers.authorization = 'Bearer ' + signature;

          return res.status(200).json({
            signature,
            name: user.name,
            email: user.email
          })
        }
      }
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }


  async onGetUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const data = await this.interactor.getUser(userId);
      return res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }
  async onDeleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const data = await this.interactor.deleteUserById(userId);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onGetUsers(req: Request, res: Response, next: NextFunction) {

    try {
      const offset = parseInt(`${req.query.offset}`) | 0;
      const limit = parseInt(`${req.query.limit}`) || 10;
      const data = await this.interactor.getUsers(limit, offset);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }

  async onUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(`${req.query.id}`)
      const name = (`${req.query.name}`);
      const updatedData = await this.interactor.updateUser(id, name);
      return res.status(200).json(updatedData)

    } catch (error: any) {
      res.status(500).send(error.message)
    }
  }
}









// import { Request, Response } from 'express';

// // Login User
// export const loginUser = async (req: Request, res: Response) => {
//   // const body = req.body;
//   const { email, password } = req.body;
//   // Validate Request
//   if (!email || !password) {
//     res.status(400);
//     throw new Error('Please send email and password');
//   }


//   // check if user exist in DB
//   const user = {
//     name: 'moshe',
//     email: 'email'
//   } //await User.findOne({ email: email });
//   if (!user) {
//     res.status(400);
//     throw new Error('User not found please sign up');
//   }

//   // check user password with hashed password stored in the database
//   const validPassword = true // await bcrypt.compare(password, user.password);

//   //Generate  Token
//   const token = 'kjhhkasfasfg'; //generateToken(user._id);
//   // Send HTTP-only Cookie to client
//   res.cookie("token", token, {
//     path: '/',
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000 * 86400), // 1 day
//     sameSite: "none",
//     secure: true
//   });

//   if (validPassword) {
//     // const { _id, name, email } = user;
//     res.status(200).json({
//       email,
//       token
//     });
//   } else {
//     res.status(4000);
//     throw new Error('Wrong Password or password Please insert the correct one');
//   }
// };




















