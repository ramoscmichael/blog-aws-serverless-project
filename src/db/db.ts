import { Connection, FieldInfo, Pool, createPool, escape } from 'mysql';
import { DB_UTIL } from '../util';

export interface QueryResult  {
    results: any;
    fields: FieldInfo [] | undefined;
}

export class DBConnection {

    constructor(public readonly conn: Connection) {}
    async query(sql: string, values: any = {}): Promise<{results: any, fields: FieldInfo[] | undefined}> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, values, (err, results, fields) => {
                if(err) reject(err)
                else resolve({results , fields})
            });
        })
    }

}

export class DB {
    private readonly pool: Pool;
    constructor()  {
        this.pool = createPool({
            connectionLimit : DB_UTIL.DB_POOL_LIMIT,
            host: DB_UTIL.DB_HOST,
            password: DB_UTIL.DB_PASSWORD,
            user: DB_UTIL.DB_USERNAME,
            queryFormat: (query, values) => {
                if (!values) return query;
                return query.replace(/\:(\w+)/g, (txt, key) => {
                    if (values.hasOwnProperty(key)) {
                        return escape(values[key]);
                    }
                    return txt;
                });
            }
        });
    }

    async transaction<T>(tx: (connection: DBConnection) => Promise<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.pool.getConnection((err, con) => {
                if(err) {
                    reject(err)
                } else {
                    const dbCon = new DBConnection(con);
                    con.beginTransaction();
                    tx(dbCon).then((resp) => {
                        con.commit();
                        resolve(resp);
                    })
                    .catch(err => {
                        con.rollback();
                        reject(err);
                    })
                    .finally(() => con.release());
                }
            })
        })
    }
}