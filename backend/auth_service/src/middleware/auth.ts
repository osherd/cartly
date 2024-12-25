import { Request, Response, NextFunction } from 'express';
import { validateSignature } from '../utils/password';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

  const signature = await validateSignature(req);
  if (signature) {
    return next()
  } else {
    return res.json({ message: "User Not authorised" });
  }
}