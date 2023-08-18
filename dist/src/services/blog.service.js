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
exports.BlogService = void 0;
const dao_1 = require("../dao");
const util_1 = require("../util");
class BlogService {
    constructor(db) {
        this.db = db;
        this.blogDao = new dao_1.BlogDao();
        this.userDao = new dao_1.UserDao();
    }
    addBlogPost(blog, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userDao.getUserById(conn, user_id);
                (0, util_1.objectNotNull)(user, 'User not exists.');
                const res = yield this.blogDao.addBlogPost(conn, blog, user_id);
                return Object.assign(Object.assign({}, blog), { id: res.results.insertId });
            }));
        });
    }
    updateBlogPost(blog, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => __awaiter(this, void 0, void 0, function* () {
                const user = yield this.userDao.getUserById(conn, user_id);
                (0, util_1.objectNotNull)(user, 'User not exists.');
                const post = yield this.blogDao.getBlogPost(conn, blog.id, user_id);
                (0, util_1.objectNotNull)(post, 'Blog post not exists.');
                yield this.blogDao.updateBlogPost(conn, blog, user_id);
                return this.blogDao.getBlogPost(conn, blog.id, user_id);
            }));
        });
    }
    deleteBlogPost(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => __awaiter(this, void 0, void 0, function* () {
                const post = yield this.blogDao.getBlogPost(conn, id, user_id);
                (0, util_1.objectNotNull)(post, 'Blog post not exists.');
                yield this.blogDao.deleteBlogPost(conn, id, user_id);
                return post;
            }));
        });
    }
    getBlogPosts(offset = 0, limit = 25, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => __awaiter(this, void 0, void 0, function* () { return this.blogDao.getBlogPosts(conn, offset, limit, user_id); }));
        });
    }
    getBlogPost(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((conn) => this.blogDao.getBlogPost(conn, id, user_id));
        });
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map