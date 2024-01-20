import mongoose, { Schema, Document } from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

export interface IConversationDocument extends Document {
    name: string
    picture: string
    isGroup: boolean
    users: (typeof ObjectId)[]
    latestMessage: typeof ObjectId
    admin: typeof ObjectId
}

const conversationSchema = new Schema<IConversationDocument>(
    {
        name: {
            type: String,
            required: [true, 'Conversations name is required.'],
            trim: true,
        },
        picture: {
            type: String,
            required: true,
        },
        isGroup: {
            type: Boolean,
            required: true,
            default: false,
        },
        users: [
            {
                type: ObjectId,
                ref: 'UserModel',
            },
        ],
        latestMessage: {
            type: ObjectId,
            ref: 'MessageModel',
        },
        admin: {
            type: ObjectId,
            ref: 'UserModel',
        },
    },
    {
        collection: 'conversations',
        timestamps: true,
    }
)

export const ConversationModel =
    mongoose.models.ConversationModel ||
    mongoose.model<IConversationDocument>(
        'ConversationModel',
        conversationSchema
    )
