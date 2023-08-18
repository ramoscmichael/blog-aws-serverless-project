export const DB_UTIL = {
    DB_POOL_LIMIT: +(process.env.DB_POOL_LIMIT ?? '10'),
    DB_HOST: process.env.DB_HOST ?? 'localhost',
    DB_USERNAME: process.env.DB_USERNAME ?? 'root',
    DB_PASSWORD: process.env.DB_PASSWORD ?? 'root',
}