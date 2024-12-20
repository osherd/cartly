"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(email, password, resetToken, resetTokenExpiration, id, salt) {
        this.email = email;
        this.password = password;
        this.resetToken = resetToken;
        this.resetTokenExpiration = resetTokenExpiration;
        this.id = id;
        this.salt = salt;
    }
}
exports.User = User;
