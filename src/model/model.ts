export interface  Post {
    id: number;
    title: string;
    content: string;
    created_dt: Date;
    updated_dt: Date;
    deleted_dt: Date;
    user_id: number;
}

export interface User {
    id: number;
    username: string;
    password?: string;

    first_name: string;
    last_name: string;
}

export interface LoginInfo {
    username: string;
    password: string;
}

export interface Token {
    access_token: string;
}