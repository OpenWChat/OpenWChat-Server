import mongoose, { Schema } from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
const messageSchema = new Schema({
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
        type: [Schema.Types.Mixed],
    },
}, {
    collection: 'messages',
    timestamps: true,
});
export const MessageModel = mongoose.models.MessageModel ||
    mongoose.model('MessageModel', messageSchema);
//# sourceMappingURL=message.js.map