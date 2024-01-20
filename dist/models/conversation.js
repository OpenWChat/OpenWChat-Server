import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;
const conversationSchema = mongoose.Schema({
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
}, {
    collection: 'conversations',
    timestamps: true,
});
export const ConversationModel = mongoose.models.ConversationModel ||
    mongoose.model('ConversationModel', conversationSchema);
//# sourceMappingURL=conversation.js.map