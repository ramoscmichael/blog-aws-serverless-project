"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_UTIL = void 0;
exports.DB_UTIL = {
    DB_POOL_LIMIT: +((_a = process.env.DB_POOL_LIMIT) !== null && _a !== void 0 ? _a : '10'),
    DB_HOST: (_b = process.env.DB_HOST) !== null && _b !== void 0 ? _b : 'localhost',
    DB_USERNAME: (_c = process.env.DB_USERNAME) !== null && _c !== void 0 ? _c : 'root',
    DB_PASSWORD: (_d = process.env.DB_PASSWORD) !== null && _d !== void 0 ? _d : 'root',
};
//# sourceMappingURL=db.util.js.map