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
exports.UserRepository = void 0;
const dbConnection_1 = require("../config/dbConnection");
class UserRepository {
    constructor() {
        this.client = (0, dbConnection_1.pgClient)();
    }
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, id, resetToken, resetTokenExpiration, salt }) {
            const user = yield this.client.query(`INSERT INTO users (id, email,password,resetToken,resetTokenExpiration,salt) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [id, email, password, resetToken, resetTokenExpiration, salt]);
            return user.rows[0];
        });
    }
    update(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.query(`UPDATE users SET email=$1 WHERE id=$2 RETURNING *`, [email, userId]);
            return user.rows[0];
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.client.query(`SELECT * FROM Users WHERE id = $1`, [userId]);
            return users.rows[0];
        });
    }
    find(limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.client.query(`SELECT * FROM users OFFSET $1 LIMIT $2`, [offset, limit]);
            return users.rows;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.client.query(`DELETE FROM users WHERE id = $1`, [userId]);
            return user.rows[0];
        });
    }
}
exports.UserRepository = UserRepository;
