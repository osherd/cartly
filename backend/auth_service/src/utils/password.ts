import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config/index';


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
  return (await generatePassword(enteredPassword, salt)) === savedPassword;
};

export const generateSignature = async (payload: any) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '6d' });
};

export const validateSignature = async (req: Request) => {
  const token = req.header('authorization');
  // const token = req.get('Authorization');

  if (token) {
    try {
      const payload = await jwt.verify(token.split(' ')[1], APP_SECRET);
      // @ts-ignore
      req.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};
