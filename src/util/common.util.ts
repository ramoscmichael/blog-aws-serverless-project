import { compare, genSalt, hash } from 'bcryptjs'

export const fieldNotNull = (object: any, field: string, errMessage: string) => {
    if(!object?.[field]) throw { message: errMessage }
}

export const objectNotNull = (object: any, errMessage: string) => {
    if(!object) throw { message: errMessage }
}

export const enrcyptPassword = (password: string) => genSalt(10).then(salt => hash(password, salt));
export const comparePassword = (inputPassword: string, hashedPassword: string) => compare(inputPassword, hashedPassword);
export const sendResponseJson = (data: Promise<any>, res: any) => data
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))