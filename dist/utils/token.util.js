import jwt, { SignOptions } from 'jsonwebtoken';

export const sign = async (payload: any, expiresIn: string | number, secret: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secret,
            {
                expiresIn: expiresIn as string | number,
            } as SignOptions,
            (error: Error | null, token: string | undefined) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve(token as string);
                }
            }
        );
    });
};

export const verify = async (token: string, secret: string): Promise<string | null> => {
    return new Promise((resolve) => {
        jwt.verify(token, secret, (error, payloa) => {
            if (error) {
                console.error(error);
                resolve(null);
            } else {
                resolve(payload as string);
            }
        });
    });
};
