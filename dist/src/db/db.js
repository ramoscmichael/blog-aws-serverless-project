"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.DBConnection = void 0;
const mysql_1 = require("mysql");
const util_1 = require("../util");
class DBConnection {
    constructor(conn) {
        this.conn = conn;
    }
    query(sql, values = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.conn.query(sql, values, (err, results, fields) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ results, fields });
                });
            });
        });
    }
}
exports.DBConnection = DBConnection;
class DB {
    constructor() {
        this.pool = (0, mysql_1.createPool)({
            connectionLimit: util_1.DB_UTIL.DB_POOL_LIMIT,
            host: util_1.DB_UTIL.DB_HOST,
            password: util_1.DB_UTIL.DB_PASSWORD,
            user: util_1.DB_UTIL.DB_USERNAME,
            queryFormat: (query, values) => {
                if (!values)
                    return query;
                return query.replace(/\:(\w+)/g, (txt, key) => {
                    if (values.hasOwnProperty(key)) {
                        return (0, mysql_1.escape)(values[key]);
                    }
                    return txt;
                });
            }
        });
    }
    transaction(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.pool.getConnection((err, con) => {
                    if (err) {
                        reject(err);
                    }
                    else {
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
                });
            });
        });
    }
}
exports.DB = DB;
//# sourceMappingURL=db.js.map