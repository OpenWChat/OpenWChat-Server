import jwt from 'jsonwebtoken'
export const sign = async (payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            secret,
            {
                expiresIn: expiresIn,
            },
            (error, token) => {
                if (error) {
                    console.error(error)
                    reject(error)
                } else {
                    resolve(token)
                }
            }
        )
    })
}

export const verify = async (token, secret) => {
    return new Promise((resolve) => {
        jwt.verify(token, secret, (error, payload) => {
            if (error) {
                console.error(error)
                resolve(null)
            } else {
                resolve(payload)
            }
        })
    })
}
