import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email address'],
            unique: [true, 'This email address already exists'],
            lowercase: true,
            validate: [
                validator.isEmail,
                'Please provide a valid email address',
            ],
        },
        picture: {
            type: String,
            default:
                'https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg',
        },
        status: {
            type: String,
            default: 'Hey there! I am using OpenWChat',
        },
        password: {
            type: String,
            required: [true, 'Please provide your password'],
            minLength: [
                6,
                'Please make sure that your password is 6 characters long',
            ],
            maxLength: [
                128,
                'Please make sure that your password is less than 128 characters',
            ],
        },
    },
    {
        collection: 'users',
        timestamps: true,
    }
)

export const UserModel =
    mongoose.models.UserModel || mongoose.model('UserModel', userSchema)
