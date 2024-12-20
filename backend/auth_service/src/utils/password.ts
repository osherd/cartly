import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = async (payload: any) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '6d' });
};

// export const ValidateSignature = async (req: Request) => {
//   const token = req.get('Authorization');

//   if (token) {
//     try {
//       const payload = await jwt.verify(token.split(' ')[1], APP_SECRET);
//       // @ts-ignore
//       req.user = payload;
//       return true;
//     } catch (err) {
//       return false;
//     }
//   }
//   return false;
// };