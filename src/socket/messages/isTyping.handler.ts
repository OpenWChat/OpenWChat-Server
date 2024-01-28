import { Socket } from 'socket.io'

export function isTyping(socket: Socket) {
    return (conversationId: string) => {
        socket.in(conversationId).emit('typing', conversationId)
    }
}
