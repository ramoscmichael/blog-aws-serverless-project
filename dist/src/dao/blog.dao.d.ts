import { DBConnection, QueryResult } from "../db";
import { Post } from "../model";
export declare const SELECT_BLOG_POST_BY_ID = "SELECT p.* FROM blog.post p WHERE p.id = :id AND p.user_id = :user_id";
export declare const SELECT_BLOG_POSTS = "SELECT p.* FROM blog.post p WHERE p.user_id = :user_id LIMIT :limit";
export declare const SELECT_COUNT_BLOG_POSTS = "SELECT count(p.id) FROM blog.post p WHERE p.user_id = :user_id";
export declare const INSERT_BLOG_POST = "INSERT INTO blog.post (title, content, user_id, created_dt) VALUES (:title, :content, :user_id, now())";
export declare const UPDATE_BLOG_POST = "UPDATE blog.post set title = :title, content = :content, updated_dt = now() WHERE id = :id AND user_id = :user_id";
export declare const DELETE_BLOG_POST = "DELETE FROM blog.post WHERE id= :id and user_id = :user_id";
export declare class BlogDao {
    addBlogPost(conn: DBConnection, blog: Post, user_id: number): Promise<QueryResult>;
    updateBlogPost(conn: DBConnection, blog: Post, user_id: number): Promise<QueryResult>;
    deleteBlogPost(conn: DBConnection, id: number, user_id: number): Promise<QueryResult>;
    getBlogPosts(conn: DBConnection, offset: number | undefined, limit: number | undefined, user_id: number): Promise<Post[]>;
    getBlogPost(conn: DBConnection, id: number, user_id: number): Promise<Post>;
    private toBlogPost;
}
