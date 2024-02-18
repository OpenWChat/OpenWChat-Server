import { IConversationDocument } from 'models/conversation.model.js'
import { ConversationModel, UserModel } from '../models/index.js'

export const doesConversationExist = async (
    sender_id: string,
    receiver_id: string,
    isGroup: boolean
) => {
    if (isGroup === false) {
        let convos = await ConversationModel.find({
            isGroup: false,
            $and: [
                { users: { $elemMatch: { $eq: sender_id } } },
                { users: { $elemMatch: { $eq: receiver_id } } },
            ],
        })
            .populate('users', '-password')
            .populate('latestMessage')

        if (!convos) return 'Oops...Something went wrong !'

        convos = await UserModel.populate(convos, {
            path: 'latestMessage.sender',
            select: 'name email picture status',
        })

        return convos[0]
    } else {
        let convo = await ConversationModel.findById(isGroup)
            .populate('users admin', '-password')
            .populate('latestMessage')

        if (!convo) return 'Oops...Something went wrong !'
        convo = await UserModel.populate(convo, {
            path: 'latestMessage.sender',
            select: 'name email picture status',
        })

        return convo
    }
}

export const createConversation = async (data: IConversationDocument) => {
    const newConvo = await ConversationModel.create(data)
    if (!newConvo) return 'Oops...Something went wrong !'
    return newConvo
}

export const populateConversation = async (
    id: string,
    fieldToPopulate: string,
    fieldsToRemove: string
) => {
    const populatedConvo = await ConversationModel.findOne({
        _id: id,
    }).populate(fieldToPopulate, fieldsToRemove)

    if (!populatedConvo) return 'Oops...Something went wrong !'
    return populatedConvo
}
export const getUserConversations = async (user_id: string) => {
    let conversations
    await ConversationModel.find({
        users: { $elemMatch: { $eq: user_id } },
    })
        .populate('users', '-password')
        .populate('admin', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await UserModel.populate(results, {
                path: 'latestMessage.sender',
                select: 'name email picture status',
            })
            conversations = results
        })
        .catch(() => {
            return 'Oops...Something went wrong !'
        })
    return conversations
}

export const updateLatestMessage = async (convo_id: string, msg: string) => {
    const updatedConvo = await ConversationModel.findByIdAndUpdate(convo_id, {
        latestMessage: msg,
    })
    if (!updatedConvo) return 'Oops...Something went wrong !'

    return updatedConvo
}
