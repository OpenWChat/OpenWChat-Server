import { RequestHandler } from 'express'
import {
    createConversation,
    doesConversationExist,
    getUserConversations,
    populateConversation,
} from '../services/conversation.service.js'
import { IConversationDocument } from '../models/conversation.js'
import { UserModel } from '../models/user.js'

export const create_open_conversation: RequestHandler = async (
    req: any,
    res,
    next
) => {
    try {
        const sender_id = req.user.userId
        const { receiver_id, isGroup } = req.body
        if (isGroup == false) {
            if (!receiver_id) {
                console.error(
                    'please provide the user id you wanna start a conversation with !'
                )
                return res.status(400).json({
                    message: 'Oops...Something went wrong !',
                })
            }

            const existed_conversation = await doesConversationExist(
                sender_id,
                receiver_id,
                false
            )

            if (typeof existed_conversation === 'string') {
                return res.status(400).json({ message: existed_conversation })
            }

            if (existed_conversation) {
                res.json(existed_conversation)
            } else {
                const receiverUser: any = UserModel.findById(receiver_id)

                let convoData = {
                    name: receiverUser.name,
                    picture: receiverUser.picture,
                    isGroup: false,
                    users: [sender_id, receiver_id],
                }
                const newConvo = await createConversation(
                    convoData as IConversationDocument
                )

                if (typeof newConvo === 'string') {
                    return res.status(400).json({ message: newConvo })
                }

                const populatedConvo = await populateConversation(
                    newConvo._id,
                    'users',
                    '-password'
                )

                if (typeof populatedConvo === 'string') {
                    return res.status(400).json({ message: populatedConvo })
                }

                res.status(200).json(populatedConvo)
            }
        } else {
            const existed_group_conversation = await doesConversationExist(
                '',
                '',
                isGroup
            )

            if (typeof existed_group_conversation === 'string') {
                return res
                    .status(400)
                    .json({ message: existed_group_conversation })
            }

            res.status(200).json(existed_group_conversation)
        }
    } catch (error) {
        next(error)
    }
}

export const getConversations: RequestHandler = async (req: any, res, next) => {
    try {
        const user_id = req.user.userId
        const conversations = await getUserConversations(user_id)

        if (typeof conversations === 'string') {
            return res.status(400).json({ message: conversations })
        }

        res.status(200).json(conversations)
    } catch (error) {
        next(error)
    }
}
export const createGroup: RequestHandler = async (req: any, res, next) => {
    const { name, users } = req.body
    users.push(req.user.userId)
    if (!name || !users) {
        return res.status(400).json({
            message: 'Please fill all fields.',
        })
    }
    if (users.length < 2) {
        return res.status(400).json({
            message: 'Atleast 2 users are required to start a group chat.',
        })
    }
    let convoData = {
        name,
        users,
        isGroup: true,
        admin: req.user.userId,
        picture: process.env.DEFAULT_GROUP_PICTURE,
    }
    try {
        const newConvo = await createConversation(
            convoData as IConversationDocument
        )

        if (typeof newConvo === 'string') {
            return res.status(400).json({ message: newConvo })
        }

        const populatedConvo = await populateConversation(
            newConvo._id,
            'users admin',
            '-password'
        )

        if (typeof populatedConvo === 'string') {
            return res.status(400).json({ message: populatedConvo })
        }

        res.status(200).json(populatedConvo)
    } catch (error) {
        next(error)
    }
}
