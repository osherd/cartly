
import express from "express";
import { UserRepository } from '../repositories/userRepository'
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/UserController';

const router = express.Router();
const repository = new UserRepository()
const serviceInteractor = new UserService(repository)
const controller = new UserController(serviceInteractor);


//Suignup / Create User
router.post('/auth/users/signup', controller.onUserSignup.bind(controller))

//Login
router.post('/auth/users/login', controller.onUserLogin.bind(controller));

// Change Password
router.patch('/auth/users/change-password', controller.onChangePassword.bind(controller));


router.get('/auth/users', controller.onGetUsers.bind(controller));
router.get('/auth/users/:id', controller.onGetUserById.bind(controller));
router.get('/auth/users/:id', controller.onDeleteUserById.bind(controller));
router.patch('/auth/users/:id', controller.onUpdateUser.bind(controller))


export default router;