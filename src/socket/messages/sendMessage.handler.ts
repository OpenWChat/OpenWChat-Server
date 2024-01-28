import { Socket } from 'socket.io'

export function sendMessage(socket: Socket) {
    return (message: any) => {
        let conversation: any = message.conversation

        if (!conversation.users) return

        conversation.users.forEach((user: any) => {
            if (user._id === message.sender._id) return

            socket
                .in(String(message.conversation._id))
                .emit('message received', message)
        })
    }
}
