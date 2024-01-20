var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConversationModel, UserModel } from '../models/index.js';
export const doesConversationExist = (sender_id, receiver_id, isGroup) => __awaiter(void 0, void 0, void 0, function* () {
    if (isGroup === false) {
        let convos = yield ConversationModel.find({
            isGroup: false,
            $and: [
                { users: { $elemMatch: { $eq: sender_id } } },
                { users: { $elemMatch: { $eq: receiver_id } } },
            ],
        })
            .populate('users', '-password')
            .populate('latestMessage');
        if (!convos)
            return ('Oops...Something went wrong !');
        convos = yield UserModel.populate(convos, {
            path: 'latestMessage.sender',
            select: 'name email picture status',
        });
        return convos[0];
    }
    else {
        let convo = yield ConversationModel.findById(isGroup)
            .populate('users admin', '-password')
            .populate('latestMessage');
        if (!convo)
            return ('Oops...Something went wrong !');
        convo = yield UserModel.populate(convo, {
            path: 'latestMessage.sender',
            select: 'name email picture status',
        });
        return convo;
    }
});
export const createConversation = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newConvo = yield ConversationModel.create(data);
    if (!newConvo)
        return ('Oops...Something went wrong !');
    return newConvo;
});
export const populateConversation = (id, fieldToPopulate, fieldsToRemove) => __awaiter(void 0, void 0, void 0, function* () {
    const populatedConvo = yield ConversationModel.findOne({
        _id: id,
    }).populate(fieldToPopulate, fieldsToRemove);
    if (!populatedConvo)
        return ('Oops...Something went wrong !');
    return populatedConvo;
});
export const getUserConversations = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let conversations;
    yield ConversationModel.find({
        users: { $elemMatch: { $eq: user_id } },
    })
        .populate('users', '-password')
        .populate('admin', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .then((results) => __awaiter(void 0, void 0, void 0, function* () {
        results = yield UserModel.populate(results, {
            path: 'latestMessage.sender',
            select: 'name email picture status',
        });
        conversations = results;
    }))
        .catch(() => {
        return ('Oops...Something went wrong !');
    });
    return conversations;
});
export const updateLatestMessage = (convo_id, msg) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedConvo = yield ConversationModel.findByIdAndUpdate(convo_id, {
        latestMessage: msg,
    });
    if (!updatedConvo)
        return ('Oops...Something went wrong !');
    return updatedConvo;
});
//# sourceMappingURL=conversation.service.js.map