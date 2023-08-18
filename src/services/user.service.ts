import { UserDao } from "../dao";
import { DB } from "../db";
import { LoginInfo, User } from "../model";
import { enrcyptPassword, fieldNotNull, generateAccessToken, objectNotNull } from "../util";


export class UserService {

    userDao: UserDao = new UserDao();

    constructor(private db: DB) {}

    async getUserById(id: number): Promise<User> {
        return this.db.transaction((conn) => this.userDao.getUserById(conn, id));
    }

    async generateAccessToken(login: LoginInfo) {
        fieldNotNull(login, 'username', 'Username is required.');
        fieldNotNull(login, 'password', 'Password is required.');

        const user = await this.getUserByUsername(login.username);
        objectNotNull(user, 'Invalid username/password');

        const access_token = generateAccessToken({
            ... user,
            password: null
        });

        return access_token;
    }

    async getUserByUsername(username: string): Promise<User> {
        return this.db.transaction((conn) => this.userDao.getUserByUsername(conn, username));
    }

    async updateUser(user: User): Promise<User> {
        return this.db.transaction(async (conn) => {
            const existingUser = await this.userDao.getUserById(conn, user.id); 
            objectNotNull(existingUser, 'User not exists.');
            await this.userDao.updateUser(conn, user);
            return this.userDao.getUserById(conn, user.id)
        });
    }

    async createUser(user: User): Promise<User> {
        return this.db.transaction(async (conn) => {
            fieldNotNull(user, 'username', 'username is required.');
            fieldNotNull(user, 'password', 'password is required.');
            
            const existingUser = await this.userDao.getUserByUsername(conn, user.username); 

            objectNotNull(!existingUser, 'Username already in used.');
            const password = await enrcyptPassword(user.password ?? '');

            const res = await this.userDao.createUser(conn, {
                ... user,
                password
            });

            return this.userDao.getUserById(conn, res.results.insertId);
        });
    }

}