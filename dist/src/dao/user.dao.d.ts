import { DBConnection, QueryResult } from "../db";
import { User } from "../model";
export declare const SELECT_USER_BY_USERNAME = "SELECT u.* FROM blog.user u WHERE u.username = :username";
export declare const SELECT_USER_BY_ID = "SELECT u.* FROM blog.user u WHERE u.id = :id";
export declare const UPDATE_USER = "UPDATE blog.user SET first_name = :first_name, last_name = :last_name, updated_dt = now() WHERE id = :id";
export declare const DELETE_USER = "DELETE FROM blog.user WHERE u.id = :id";
export declare const INSERT_USER = "INSERT INTO blog.user (username, first_name, last_name, password, created_dt) VALUES (:username, :first_name, :last_name, :password, now())";
export declare class UserDao {
    getUserByUsername(conn: DBConnection, username: string): Promise<User>;
    getUserById(conn: DBConnection, id: number): Promise<User>;
    updateUser(conn: DBConnection, user: User): Promise<QueryResult>;
    createUser(conn: DBConnection, user: User): Promise<QueryResult>;
    private toUser;
}
