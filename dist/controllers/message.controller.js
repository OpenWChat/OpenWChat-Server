var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { updateLatestMessage } from '../services/conversation.service.js';
import { createMessage, getConvoMessages, populateMessage, } from '../services/message.service.js';
export const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.userId;
        const { message, convo_id, files } = req.body;
        if (!convo_id || (!message && !files)) {
            console.error('Please provider a conversation id and a message body');
            return res.sendStatus(400);
        }
        const msgData = {
            sender: user_id,
            message,
            conversation: convo_id,
            files: files || [],
        };
        let newMessage = yield createMessage(msgData);
        if (typeof newMessage === 'string') {
            return res.status(400).json({ message: newMessage });
        }
        let populatedMessage = yield populateMessage(newMessage._id);
        if (typeof populatedMessage === 'string') {
            return res.status(400).json({ message: populatedMessage });
        }
        yield updateLatestMessage(convo_id, newMessage);
        res.json(populatedMessage);
    }
    catch (error) {
        next(error);
    }
});
export const getMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const convo_id = req.params.convo_id;
        if (!convo_id) {
            console.error('Please add a conversation id in params.');
            res.sendStatus(400);
        }
        const messages = yield getConvoMessages(convo_id);
        if (typeof messages === 'string') {
            return res.status(400).json({ message: messages });
        }
        res.json(messages);
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=message.controller.js.map