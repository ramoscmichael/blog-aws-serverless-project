import { expressjwt } from "express-jwt";
import { sign } from 'jsonwebtoken'

export const JWT_CONFIG = {
    secret: process.env.JWT_SECRET ?? 'secretKey',
    algo: process.env.JWT_ALGO ?? "HS256",
}

export const securedRoute = () => expressjwt({ secret: JWT_CONFIG.secret, algorithms: [JWT_CONFIG.algo as any] });

export const generateAccessToken = (claims: any) => sign(claims, JWT_CONFIG.secret, {
    algorithm: JWT_CONFIG.algo as any,
    expiresIn: '30d'
});
