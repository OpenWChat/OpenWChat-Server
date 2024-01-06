export default function (socket) {
    // user joins or opens the app
    socket.on('join', (user) => {
        console.log('user has joined: ', user)
        socket.join(user)
    })
}
