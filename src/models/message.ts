import mongoose, { Schema, Document } from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

export interface IMessageDocument extends Document {
    sender: typeof ObjectId;
    message: string;
    conversation: typeof ObjectId;
    files: any[];
}

const messageSchema = new Schema<IMessageDocument>(
    {
        sender: {
            type: ObjectId,
            ref: 'UserModel',
        },
        message: {
            type: String,
            trim: true,
        },
        conversation: {
            type: ObjectId,
            ref: 'ConversationModel',
        },
        files: {
            type: [Schema.Types.Mixed] as Array<Record<string, any>>,
        },
    },
    {
        collection: 'messages',
        timestamps: true,
    }
);


export const MessageModel = mongoose.models.MessageModel ||
    mongoose.model<IMessageDocument>('MessageModel', messageSchema);
