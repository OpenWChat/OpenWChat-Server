import createHttpError from 'http-errors'
import validator from 'validator'
import { UserModel } from '../models/index.js'
import bcrypt from 'bcrypt'

const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env

export const createUser = async (userData) => {
    const { name, email, picture, status, password } = userData

    if (!name || !email || !password) {
        throw createHttpError.BadRequest('Please fill all fields.')
    }

    if (
        !validator.isLength(name, {
            min: 2,
            max: 25,
        })
    ) {
        throw createHttpError.BadRequest(
            'Plase make sure your name is between 2 and 16 characters.'
        )
    }

    if (status && status.length > 64) {
        throw createHttpError.BadRequest(
            'Please make sure your status is less than 64 characters.'
        )
    }

    if (!validator.isEmail(email)) {
        throw createHttpError.BadRequest(
            'Please make sure to provide a valid email address.'
        )
    }

    const checkDb = await UserModel.findOne({ email })
    if (checkDb) {
        throw createHttpError.Conflict(
            'Please try again with a different email address, this email already exist.'
        )
    }

    if (
        !validator.isLength(password, {
            min: 6,
            max: 128,
        })
    ) {
        throw createHttpError.BadRequest(
            'Please make sure your password is between 6 and 128 characters.'
        )
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

export const signUser = async (email, password) => {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).lean()

    if (!user) throw createHttpError.NotFound('Invalid credentials.')

    let passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) throw createHttpError.NotFound('Invalid credentials.')

    return user
}
