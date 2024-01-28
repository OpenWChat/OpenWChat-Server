import { Socket } from 'socket.io'

export function joinConversation(socket: Socket) {
    return (conversationId: string) => {
        socket.join(conversationId)
    }
}
