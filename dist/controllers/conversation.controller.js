var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createConversation, doesConversationExist, getUserConversations, populateConversation, } from '../services/conversation.service.js';
export const create_open_conversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sender_id = req.user.userId;
        const { receiver_id, isGroup } = req.body;
        if (isGroup == false) {
            if (!receiver_id) {
                console.error('please provide the user id you wanna start a conversation with !');
                return res.status(400).json({
                    message: 'Oops...Something went wrong !',
                });
            }
            const existed_conversation = yield doesConversationExist(sender_id, receiver_id, false);
            if (typeof existed_conversation === 'string') {
                return res.status(400).json({ message: existed_conversation });
            }
            if (existed_conversation) {
                res.json(existed_conversation);
            }
            else {
                let convoData = {
                    name: 'conversation name',
                    picture: 'conversation picture',
                    isGroup: false,
                    users: [sender_id, receiver_id],
                };
                const newConvo = yield createConversation(convoData);
                if (typeof newConvo === 'string') {
                    return res.status(400).json({ message: newConvo });
                }
                const populatedConvo = yield populateConversation(newConvo._id, 'users', '-password');
                if (typeof populatedConvo === 'string') {
                    return res.status(400).json({ message: populatedConvo });
                }
                res.status(200).json(populatedConvo);
            }
        }
        else {
            const existed_group_conversation = yield doesConversationExist('', '', isGroup);
            if (typeof existed_group_conversation === 'string') {
                return res
                    .status(400)
                    .json({ message: existed_group_conversation });
            }
            res.status(200).json(existed_group_conversation);
        }
    }
    catch (error) {
        next(error);
    }
});
export const getConversations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.userId;
        const conversations = yield getUserConversations(user_id);
        if (typeof conversations === 'string') {
            return res.status(400).json({ message: conversations });
        }
        res.status(200).json(conversations);
    }
    catch (error) {
        next(error);
    }
});
export const createGroup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, users } = req.body;
    users.push(req.user.userId);
    if (!name || !users) {
        return res.status(400).json({
            message: 'Please fill all fields.',
        });
    }
    if (users.length < 2) {
        return res.status(400).json({
            message: 'Atleast 2 users are required to start a group chat.',
        });
    }
    let convoData = {
        name,
        users,
        isGroup: true,
        admin: req.user.userId,
        picture: process.env.DEFAULT_GROUP_PICTURE,
    };
    try {
        const newConvo = yield createConversation(convoData);
        if (typeof newConvo === 'string') {
            return res.status(400).json({ message: newConvo });
        }
        const populatedConvo = yield populateConversation(newConvo._id, 'users admin', '-password');
        if (typeof populatedConvo === 'string') {
            return res.status(400).json({ message: populatedConvo });
        }
        res.status(200).json(populatedConvo);
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=conversation.controller.js.map