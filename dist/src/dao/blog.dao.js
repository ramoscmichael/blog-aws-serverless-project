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
exports.BlogDao = exports.DELETE_BLOG_POST = exports.UPDATE_BLOG_POST = exports.INSERT_BLOG_POST = exports.SELECT_COUNT_BLOG_POSTS = exports.SELECT_BLOG_POSTS = exports.SELECT_BLOG_POST_BY_ID = void 0;
exports.SELECT_BLOG_POST_BY_ID = `SELECT p.* FROM blog.post p WHERE p.id = :id AND p.user_id = :user_id`;
exports.SELECT_BLOG_POSTS = `SELECT p.* FROM blog.post p WHERE p.user_id = :user_id LIMIT :limit`;
exports.SELECT_COUNT_BLOG_POSTS = `SELECT count(p.id) FROM blog.post p WHERE p.user_id = :user_id`;
exports.INSERT_BLOG_POST = `INSERT INTO blog.post (title, content, user_id, created_dt) VALUES (:title, :content, :user_id, now())`;
exports.UPDATE_BLOG_POST = 'UPDATE blog.post set title = :title, content = :content, updated_dt = now() WHERE id = :id AND user_id = :user_id';
exports.DELETE_BLOG_POST = 'DELETE FROM blog.post WHERE id= :id and user_id = :user_id';
class BlogDao {
    addBlogPost(conn, blog, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield conn.query(exports.INSERT_BLOG_POST, Object.assign(Object.assign({}, blog), { user_id }));
        });
    }
    updateBlogPost(conn, blog, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield conn.query(exports.UPDATE_BLOG_POST, Object.assign(Object.assign({}, blog), { user_id }));
        });
    }
    deleteBlogPost(conn, id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield conn.query(exports.DELETE_BLOG_POST, { id, user_id });
        });
    }
    getBlogPosts(conn, offset = 0, limit = 25, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield conn.query(exports.SELECT_BLOG_POSTS, { user_id, offset, limit });
            return res.results.map((row) => this.toBlogPost(row));
        });
    }
    getBlogPost(conn, id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield conn.query(exports.SELECT_BLOG_POST_BY_ID, { id, user_id });
            const [post] = res.results.map((row) => this.toBlogPost(row));
            return post;
        });
    }
    toBlogPost(row) {
        return {
            id: row.id,
            title: row.title,
            content: row.content.toString('utf-8'),
            created_dt: row.created_dt,
            updated_dt: row.updated_dt,
            deleted_dt: row.deleted_dt,
        };
    }
}
exports.BlogDao = BlogDao;
//# sourceMappingURL=blog.dao.js.map