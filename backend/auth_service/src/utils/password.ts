import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config/index';
import dotenv from 'dotenv';
dotenv.config();


declare global {
  namespace Express {
    interface Request {
      user: 'test'
    }
  }
}


export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {

  const generatedPassword = await generatePassword(enteredPassword, salt)
  return generatedPassword === savedPassword;
};

export const generateSignature = async (payload: any) => {
  const secret = process.env.APP_SECRET;
  if (!secret) {
    throw new Error('APP_SECRET is not defined');
  }
  return jwt.sign(payload, secret, { expiresIn: '6d' });
};

export const validateSignature = async (req: Request) => {
  // const token = req.header('authorization');
  // const token = req.get('Authorization');
  const token = req.headers['authorization'];

  if (token) {
    try {
      const secret = process.env.APP_SECRET;
      if (!secret) {
        throw new Error('APP_SECRET is not defined');
      }
      const payload = jwt.verify(token.split(' ')[1], secret);
      // @ts-ignore
      req.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};
