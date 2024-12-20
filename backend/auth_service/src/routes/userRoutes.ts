import express from "express";
import { UserRepository } from '../repositories/userRepository'
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const repository = new UserRepository()
const serviceInteractor = new UserService(repository)
const controller = new UserController(serviceInteractor);

//Login 
router.post('v1/users/login', controller.onUserLogin.bind(controller));

export default router;