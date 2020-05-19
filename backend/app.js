const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const app = express()

const server = http.createServer(app)
const io = socketio(server)

const { addUser, findUser, removeUser } = require('./controllers/chat_users')

// const path = require('path')
// const dist = path.join(__dirname, '../dist')

const router = require('./config/router')

const room = 'chatroom'

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

io.on('connection', (socket) => {
  console.log('conntection created, user entered')

  socket.on('join', ({ name, room }, callback) => {
    console.log(`user ${name.user} has joined`)
    const { error, user } = addUser({ id: socket.id, name })
    socket.emit('msg', { user: 'chat admin', message: `Hello ${name.user} welcome to this chat room` })
    // broacast sends message to all other users not currnet
    socket.broadcast.to(room).emmit('msg', { user: 'chat admin', message: `${name.user} has joined the room` })

    socket.join(room)
  })

  socket.on('sendMsg', (message, callback) => {
    const user = findUser(socket.id)

    io.to(room).emmit('msg', { user: user.name, message: message })
    // use to clear the input text area on the front end
    callback()
  })

  socket.on('disconnect', () => {
    console.log('user has left')
  })
})

app.use('/', router)

// for deployment
// app.use('/', express.static(dist))

// for deployment
// app.get('*', function(req, res) {
//   res.sendFile(path.join(dist, 'index.html'))
// });

server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))