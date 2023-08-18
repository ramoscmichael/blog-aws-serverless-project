export declare const fieldNotNull: (object: any, field: string, errMessage: string) => void;
export declare const objectNotNull: (object: any, errMessage: string) => void;
export declare const enrcyptPassword: (password: string) => Promise<string>;
export declare const comparePassword: (inputPassword: string, hashedPassword: string) => Promise<boolean>;
export declare const sendResponseJson: (data: Promise<any>, res: any) => Promise<any>;
