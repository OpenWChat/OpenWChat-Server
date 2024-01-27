import { sign, verify } from '../utils/token.util.js'

export const generateToken = async (payload: {userId: string}, expiresIn: string, secret: string) => {
    let token = await sign(payload, expiresIn, secret)
    return token
}

export const verifyToken = async (token: string, secret: string) => {
    let check = await verify(token, secret)
    return check
}
