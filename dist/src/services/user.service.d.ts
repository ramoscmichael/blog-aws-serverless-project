import { UserDao } from "../dao";
import { DB } from "../db";
import { LoginInfo, User } from "../model";
export declare class UserService {
    private db;
    userDao: UserDao;
    constructor(db: DB);
    getUserById(id: number): Promise<User>;
    generateAccessToken(login: LoginInfo): Promise<string>;
    getUserByUsername(username: string): Promise<User>;
    updateUser(user: User): Promise<User>;
    createUser(user: User): Promise<User>;
}
