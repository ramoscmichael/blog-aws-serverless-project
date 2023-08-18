import { DB } from "../db";
import { Post } from "../model";
export declare class BlogService {
    private readonly db;
    private readonly blogDao;
    private readonly userDao;
    constructor(db: DB);
    addBlogPost(blog: Post, user_id: number): Promise<Post>;
    updateBlogPost(blog: Post, user_id: number): Promise<Post>;
    deleteBlogPost(id: number, user_id: number): Promise<Post>;
    getBlogPosts(offset: number | undefined, limit: number | undefined, user_id: number): Promise<Post[]>;
    getBlogPost(id: number, user_id: number): Promise<Post>;
}
