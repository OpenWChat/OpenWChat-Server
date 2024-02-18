import validator from 'validator'
import { UserModel } from '../models/index.js'
import bcrypt from 'bcrypt'
import { IUser } from 'models/user.model.js'

const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env

export const createUser = async (userData: IUser) => {
    const { name, email, picture, status, password } = userData

    if (!name || !email || !password) {
        return 'Please fill all fields.'
    }

    if (
        !validator.isLength(name, {
            min: 2,
            max: 25,
        })
    ) {
        return 'Plase make sure your name is between 2 and 16 characters.'
    }

    if (status && status.length > 64) {
        return 'Please make sure your status is less than 64 characters.'
    }

    if (!validator.isEmail(email)) {
        return 'Please make sure to provide a valid email address.'
    }

    const checkDb = await UserModel.findOne({ email })
    if (checkDb) {
        return 'Please try again with a different email address, this email already exist.'
    }

    if (
        !validator.isLength(password, {
            min: 6,
            max: 128,
        })
    ) {
        return 'Please make sure your password is between 6 and 128 characters.'
    }

    const saltRounds = 10

    const hashedPass = await bcrypt.hash(password, saltRounds)

    const user = await new UserModel({
        name,
        email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS,
        password: hashedPass,
    }).save()

    return user
}

export const signUser = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean()

    if (!user) return 'Invalid credentials.'

    let passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) return 'Invalid credentials.'

    return user
}
