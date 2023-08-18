import { Connection, FieldInfo } from 'mysql';
export interface QueryResult {
    results: any;
    fields: FieldInfo[] | undefined;
}
export declare class DBConnection {
    readonly conn: Connection;
    constructor(conn: Connection);
    query(sql: string, values?: any): Promise<{
        results: any;
        fields: FieldInfo[] | undefined;
    }>;
}
export declare class DB {
    private readonly pool;
    constructor();
    transaction<T>(tx: (connection: DBConnection) => Promise<T>): Promise<T>;
}
