"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const password_1 = require("../utils/password");
class UserController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    onUserLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInputs = req.body;
            const { password, id } = userInputs;
            try {
                const user = yield this.interactor.getUserById(id);
                if (user) {
                    const validation = yield (0, password_1.ValidatePassword)(password, user.password, user.salt);
                    if (validation) {
                        const signature = yield (0, password_1.GenerateSignature)({
                            id: user.id,
                            email: user.email,
                        });
                        return res.status(200).json({
                            signature,
                            email: user.email
                        });
                    }
                }
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
