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
exports.UserDao = exports.INSERT_USER = exports.DELETE_USER = exports.UPDATE_USER = exports.SELECT_USER_BY_ID = exports.SELECT_USER_BY_USERNAME = void 0;
exports.SELECT_USER_BY_USERNAME = `SELECT u.* FROM blog.user u WHERE u.username = :username`;
exports.SELECT_USER_BY_ID = `SELECT u.* FROM blog.user u WHERE u.id = :id`;
exports.UPDATE_USER = `UPDATE blog.user SET first_name = :first_name, last_name = :last_name, updated_dt = now() WHERE id = :id`;
exports.DELETE_USER = `DELETE FROM blog.user WHERE u.id = :id`;
exports.INSERT_USER = `INSERT INTO blog.user (username, first_name, last_name, password, created_dt) VALUES (:username, :first_name, :last_name, :password, now())`;
class UserDao {
    getUserByUsername(conn, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield conn.query(exports.SELECT_USER_BY_USERNAME, { username });
            const [user] = res.results.map((row) => (Object.assign(Object.assign({}, this.toUser(row)), { password: row.password })));
            return user;
        });
    }
    getUserById(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield conn.query(exports.SELECT_USER_BY_ID, { id });
            const [user] = res.results.map((row) => this.toUser(row));
            return user;
        });
    }
    updateUser(conn, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield conn.query(exports.UPDATE_USER, user);
        });
    }
    createUser(conn, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield conn.query(exports.INSERT_USER, user);
        });
    }
    toUser(row) {
        return {
            id: row.id,
            username: row.username,
            first_name: row.first_name,
            last_name: row.last_name,
            created_dt: row.created_dt,
            updated_dt: row.updated_dt,
        };
    }
}
exports.UserDao = UserDao;
//# sourceMappingURL=user.dao.js.map