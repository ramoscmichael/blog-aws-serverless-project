import { DBConnection, QueryResult } from "../db";
import { User } from "../model";

export const SELECT_USER_BY_USERNAME = `SELECT u.* FROM blog.user u WHERE u.username = :username`;
export const SELECT_USER_BY_ID = `SELECT u.* FROM blog.user u WHERE u.id = :id`;
export const UPDATE_USER = `UPDATE blog.user SET first_name = :first_name, last_name = :last_name, updated_dt = now() WHERE id = :id`;
export const DELETE_USER = `DELETE FROM blog.user WHERE u.id = :id`;
export const INSERT_USER = `INSERT INTO blog.user (username, first_name, last_name, password, created_dt) VALUES (:username, :first_name, :last_name, :password, now())`;

export class UserDao {

    async getUserByUsername(conn: DBConnection, username: string): Promise<User> {
        const res = await conn.query(SELECT_USER_BY_USERNAME, { username });
        const [user] = res.results.map((row: any) => ({
            ... this.toUser(row),
            password: row.password,
        }));
        return user;
    }

    async getUserById(conn: DBConnection, id: number): Promise<User> {
        const res = await conn.query(SELECT_USER_BY_ID, { id });
        const [user] = res.results.map((row: any) => this.toUser(row));
        return user;
    }

    async updateUser(conn: DBConnection, user: User): Promise<QueryResult> {
        return await conn.query(UPDATE_USER, user);
    }

    async createUser(conn: DBConnection, user: User): Promise<QueryResult> {
        return await conn.query(INSERT_USER, user);
    }

    private toUser (row: any) {
        return {
            id: row.id,
            username: row.username,
            first_name: row.first_name,
            last_name: row.last_name,
            created_dt: row.created_dt,
            updated_dt: row.updated_dt,
        }
    }
}