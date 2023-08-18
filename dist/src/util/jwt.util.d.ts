/// <reference types="qs" />
/// <reference types="express" />
/// <reference types="node" />
export declare const JWT_CONFIG: {
    secret: string;
    algo: string;
};
export declare const securedRoute: () => {
    (req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>, next: import("express").NextFunction): Promise<void | NodeJS.Immediate>;
    unless: typeof import("express-unless").unless;
};
export declare const generateAccessToken: (claims: any) => string;
