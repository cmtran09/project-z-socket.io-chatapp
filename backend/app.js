const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const moment = require('moment')

const PORT = process.env.PORT || 5000

const app = express()

const server = http.createServer(app)
const io = socketio(server)

const { addUser, findUser, removeUser, getAllUsers, updateLastActive } = require('./controllers/chat_users')

// const path = require('path')
// const dist = path.join(__dirname, '../dist')

const router = require('./config/router')

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

io.on('connection', (socket) => {
  console.log('connection created, user entered')

  socket.on('join', ({ newUsername, room, colour }, callback) => {
    const { error, user } = addUser({ id: socket.id, newUsername, colour })
    if (error) {
      return callback(error)
    }
    socket.join(room)
    socket.emit('msg', { username: 'chat admin', message: `Hello ${user.username} welcome to this chat room` })
    // broadcast sends message to all other users not current
    socket.broadcast.to(room).emit('msg', { username: 'chat admin', message: `${user.username} has joined the room` })
    // update the front with new current users array when new person enters
    io.to(room).emit('getAllUsers', { users: getAllUsers() })
    callback()
  })

  socket.on('sendMsg', ({ message, room }, callback) => {
    console.log('MESSAGE', message)
    if(message.dummy){
      console.log('DUMMTTTYYYYYYYYY')
    }
    const currentUser = findUser(socket.id)

    // update users current last currently active time and send to front
    updateLastActive(currentUser)
    io.to(room).emit('getAllUsers', { users: getAllUsers() })

    io.to(room).emit('msg', { username: currentUser.username, message, colour: currentUser.colour , timeSent:moment().format('HH:mm:ss')})
    // use to clear the input text area on the front end
    callback()
  })

  // update users activity every 5 seconds
  const displayUserActivity = () => {
    socket.broadcast.emit('getAllUsers', { users: getAllUsers() })
    // socket.broadcast.emit('getAllUsers', { users: getAllUsers() })
  }

  socket.on('disconnect', () => {
    const currentUser = removeUser(socket.id)
    // update the front with new current users array when another person leaves (different id)
    if (currentUser) {
      socket.broadcast.emit('msg', { username: 'chat admin', message: `${currentUser.username} has left the room` })
      socket.broadcast.emit('getAllUsers', { users: getAllUsers() })
    }
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