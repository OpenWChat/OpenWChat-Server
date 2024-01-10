import { updateLatestMessage } from '../services/conversation.service.js'
import {
    createMessage,
    getConvoMessages,
    populateMessage,
} from '../services/message.service.js'

export const sendMessage = async (req, res, next) => {
    try {
        const user_id = req.user.userId
        const { message, convo_id, files } = req.body
        if (!convo_id || (!message && !files)) {
            console.error(
                'Please provider a conversation id and a message body'
            )
            return res.sendStatus(400)
        }
        const msgData = {
            sender: user_id,
            message,
            conversation: convo_id,
            files: files || [],
        }
        let newMessage = await createMessage(msgData)

        if (typeof newMessage === 'string') {
            return res.status(400).json({ message: newMessage })
        }

        let populatedMessage = await populateMessage(newMessage._id)

        if (typeof populatedMessage === 'string') {
            return res.status(400).json({ message: populatedMessage })
        }

        await updateLatestMessage(convo_id, newMessage)

        res.json(populatedMessage)
    } catch (error) {
        next(error)
    }
}
export const getMessages = async (req, res, next) => {
    try {
        const convo_id = req.params.convo_id
        if (!convo_id) {
            console.error('Please add a conversation id in params.')
            res.sendStatus(400)
        }
        const messages = await getConvoMessages(convo_id)

        if (typeof messages === 'string') {
            return res.status(400).json({ message: messages })
        }

        res.json(messages)
    } catch (error) {
        next(error)
    }
}
