const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const app = express()

const server = http.createServer(app)
const io = socketio(server)

// const path = require('path')
// const dist = path.join(__dirname, '../dist')

const router = require('./config/router')

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

io.on('connection', (socket) => {
  console.log('conntection created, user entered')

  socket.on('join', () => {
    console.log('user has joined')
    socket.emit('msg', { msg: 'message' })
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