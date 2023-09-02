import { DBConnection, QueryResult } from "../db";
import { Post } from "../model";

export const SELECT_BLOG_POST_BY_ID = `SELECT p.* FROM blog.post p WHERE p.id = :id AND p.user_id = :user_id`;
export const SELECT_BLOG_POSTS = `SELECT p.* FROM blog.post p WHERE p.user_id = :user_id LIMIT :limit`;
export const SELECT_COUNT_BLOG_POSTS = `SELECT count(p.id) total FROM blog.post p WHERE p.user_id = :user_id`;
export const INSERT_BLOG_POST = `INSERT INTO blog.post (title, content, user_id, created_dt) VALUES (:title, :content, :user_id, now())`;
export const UPDATE_BLOG_POST = 'UPDATE blog.post set title = :title, content = :content, updated_dt = now() WHERE id = :id AND user_id = :user_id';
export const DELETE_BLOG_POST = 'DELETE FROM blog.post WHERE id= :id and user_id = :user_id';

export class BlogDao {

    async addBlogPost(conn: DBConnection, blog: Post, user_id: number): Promise<QueryResult> {
       return await conn.query(INSERT_BLOG_POST, { ... blog, user_id });
    }

    async updateBlogPost(conn: DBConnection, blog: Post, user_id: number): Promise<QueryResult> {
       return await conn.query(UPDATE_BLOG_POST, {
            ... blog,
            user_id
        });
    }

    async deleteBlogPost(conn: DBConnection, id: number, user_id: number): Promise<QueryResult> {
        return await conn.query(DELETE_BLOG_POST, {id, user_id});
    }

    async getBlogPosts(conn: DBConnection, offset: number = 0, limit: number = 25, user_id: number): Promise<{
        total: number,
        results: Post[]
    }> {
        const resList = await conn.query(SELECT_BLOG_POSTS, {user_id, offset, limit});
        const resCount = await conn.query(SELECT_COUNT_BLOG_POSTS, {user_id});

        return {
            total: resCount.results.map((row: any) => row.total)?.[0],
            results: resList.results.map((row: any) => this.toBlogPost(row)),
        }
    }

    async getBlogPost(conn: DBConnection, id: number, user_id: number): Promise<Post> {
        const res = await conn.query(SELECT_BLOG_POST_BY_ID, {id, user_id});
        const [post] = res.results.map((row : any)=> this.toBlogPost(row));

        return post;
    }

    private toBlogPost(row: any) {
        return {
            id: row.id,
            title: row.title,
            content: row.content.toString('utf-8'),
            created_dt: row.created_dt,
            updated_dt: row.updated_dt,
            deleted_dt: row.deleted_dt,
        }
    }
}