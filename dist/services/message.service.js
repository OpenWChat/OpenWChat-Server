var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MessageModel } from '../models/index.js';
export const createMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let newMessage = yield MessageModel.create(data);
    if (!newMessage)
        return 'Oops...Something went wrong !';
    return newMessage;
});
export const populateMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let msg = yield MessageModel.findById(id)
        .populate({
        path: 'sender',
        select: 'name picture',
        model: 'UserModel',
    })
        .populate({
        path: 'conversation',
        select: 'name picture isGroup users',
        model: 'ConversationModel',
        populate: {
            path: 'users',
            select: 'name email picture status',
            model: 'UserModel',
        },
    });
    if (!msg)
        return 'Oops...Something went wrong !';
    return msg;
});
export const getConvoMessages = (convo_id) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield MessageModel.find({ conversation: convo_id })
        .populate('sender', 'name picture email status')
        .populate('conversation');
    if (!messages) {
        return 'Oops...Something went wrong !';
    }
    return messages;
});
//# sourceMappingURL=message.service.js.map