"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = exports.securedRoute = exports.JWT_CONFIG = void 0;
const express_jwt_1 = require("express-jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.JWT_CONFIG = {
    secret: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'secretKey',
    algo: (_b = process.env.JWT_ALGO) !== null && _b !== void 0 ? _b : "HS256",
};
const securedRoute = () => (0, express_jwt_1.expressjwt)({ secret: exports.JWT_CONFIG.secret, algorithms: [exports.JWT_CONFIG.algo] });
exports.securedRoute = securedRoute;
const generateAccessToken = (claims) => (0, jsonwebtoken_1.sign)(claims, exports.JWT_CONFIG.secret, {
    algorithm: exports.JWT_CONFIG.algo,
    expiresIn: '30d'
});
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=jwt.util.js.map