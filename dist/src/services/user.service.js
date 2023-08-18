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
exports.UserService = void 0;
const dao_1 = require("../dao");
const util_1 = require("../util");
class UserService {
    constructor(db) {
        this.db = db;
        this.userDao = new dao_1.UserDao();
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => this.userDao.getUserById(conn, id));
        });
    }
    generateAccessToken(login) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, util_1.fieldNotNull)(login, 'username', 'Username is required.');
            (0, util_1.fieldNotNull)(login, 'password', 'Password is required.');
            const user = yield this.getUserByUsername(login.username);
            (0, util_1.objectNotNull)(user, 'Invalid username/password');
            const access_token = (0, util_1.generateAccessToken)(Object.assign(Object.assign({}, user), { password: null }));
            return access_token;
        });
    }
    getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => this.userDao.getUserByUsername(conn, username));
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => __awaiter(this, void 0, void 0, function* () {
                const existingUser = yield this.userDao.getUserById(conn, user.id);
                (0, util_1.objectNotNull)(existingUser, 'User not exists.');
                yield this.userDao.updateUser(conn, user);
                return this.userDao.getUserById(conn, user.id);
            }));
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                (0, util_1.fieldNotNull)(user, 'username', 'username is required.');
                (0, util_1.fieldNotNull)(user, 'password', 'password is required.');
                const existingUser = yield this.userDao.getUserByUsername(conn, user.username);
                (0, util_1.objectNotNull)(!existingUser, 'Username already in used.');
                const password = yield (0, util_1.enrcyptPassword)((_a = user.password) !== null && _a !== void 0 ? _a : '');
                const res = yield this.userDao.createUser(conn, Object.assign(Object.assign({}, user), { password }));
                return this.userDao.getUserById(conn, res.results.insertId);
            }));
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map