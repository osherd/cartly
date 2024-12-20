"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRepository_1 = require("../repositories/userRepository");
const user_service_1 = require("../services/user.service");
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
const repository = new userRepository_1.UserRepository();
const serviceInteractor = new user_service_1.UserService(repository);
const controller = new UserController_1.UserController(serviceInteractor);
//Login 
router.post('v1/users/login', controller.onUserLogin.bind(controller));
exports.default = router;
