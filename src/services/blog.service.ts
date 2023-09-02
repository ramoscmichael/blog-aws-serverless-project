import { BlogDao, UserDao } from "../dao";
import { DB } from "../db";
import { Post } from "../model";
import { objectNotNull } from "../util";


export class BlogService {

    private readonly blogDao: BlogDao = new BlogDao();
    private readonly userDao: UserDao = new UserDao();

    constructor(private readonly db: DB) {}

    async addBlogPost(blog: Post, user_id: number): Promise<Post> {
        return this.db.transaction(async (conn) => {
            const user = await this.userDao.getUserById(conn, user_id);
            objectNotNull(user, 'User not exists.');

            const res = await this.blogDao.addBlogPost(conn, blog, user_id);
            return {
                ... blog,
                id: res.results.insertId
            };
        }); 
    }

    async updateBlogPost(blog: Post, user_id: number): Promise<Post> {
        return this.db.transaction(async (conn) => {
            const user = await this.userDao.getUserById(conn, user_id);
            objectNotNull(user, 'User not exists.');

            const post = await this.blogDao.getBlogPost(conn, blog.id, user_id);
            objectNotNull(post, 'Blog post not exists.');

            await this.blogDao.updateBlogPost(conn, blog, user_id);
            return this.blogDao.getBlogPost(conn, blog.id, user_id);
        }); 
    }

    async deleteBlogPost(id: number, user_id: number): Promise<Post> {
        return this.db.transaction(async (conn) => {
            const post = await this.blogDao.getBlogPost(conn, id, user_id);
            objectNotNull(post, 'Blog post not exists.');

            await this.blogDao.deleteBlogPost(conn, id, user_id);
            return post;
        });
    }

    async getBlogPosts(offset: number = 0, limit: number = 25, user_id: number): Promise<{
        total: number,
        results: Post[],
    }> {
        return this.db.transaction(async (conn) => this.blogDao.getBlogPosts(conn, offset, limit, user_id));
        
    }

    async getBlogPost(id: number, user_id: number): Promise<Post> {
        return this.db.transaction((conn) => this.blogDao.getBlogPost(conn, id, user_id));
    }
}