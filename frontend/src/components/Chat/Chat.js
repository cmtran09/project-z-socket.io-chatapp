import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'
import { Button, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'
import moment from 'moment'

import io from 'socket.io-client'

import './Chat.scss'

import Users from '../Users/Users'
import ChatContent from '../ChatContent/ChatContent'
import ChatForm from '../ChatForm/ChatForm'
import ChatRoomHeader from '../ChatRoomHeader/ChatRoomHeader'

let socket

const dummyMessagesTime = (mins) => {
  return moment().subtract(mins, 'minutes').format('HH:mm:ss')
}

export default function Chat(props) {

  const dummyUser1 = 'Bam'
  const dummyColour1 = 'Orange'
  const dummyUser2 = 'Dion'
  const dummyColour2 = 'mediumturquoise'

  const [userMsg, setUserMsg] = useState('')
  const [allMsg, setAllMsg] = useState([
    { username: 'chat admin', message: `${dummyUser1} has entered the room`, timeSent: dummyMessagesTime(5) },
    { username: dummyUser1, message: 'Hello every one!!', colour: dummyColour1, timeSent: dummyMessagesTime(5) },
    { username: 'chat admin', message: `${dummyUser2} has entered the room`, timeSent: dummyMessagesTime(5) },
    { username: dummyUser1, message: 'I just played tetris :D', colour: dummyColour1, timeSent: dummyMessagesTime(5) },
    { username: dummyUser2, message: 'HI!', colour: dummyColour2, timeSent: dummyMessagesTime(4) },
    { username: dummyUser1, message: 'HI! DION!', colour: dummyColour1, timeSent: dummyMessagesTime(3) },
    { username: dummyUser2, message: `Im bad at tetris, haven't played in ages`, colour: dummyColour2, timeSent: dummyMessagesTime(2) },
    { username: dummyUser1, message: 'Go play it here you will have and a-Moooozing time, https://cmtran09.github.io/project-1-vanillaJS-tetris/', colour: dummyColour1, timeSent: dummyMessagesTime(1) },
    { username: dummyUser2, message: `I'LL DO THAT RIGHT NOW`, colour: dummyColour2, timeSent: dummyMessagesTime(4) },
    { username: 'chat admin', message: `${dummyUser2} has left the room`, timeSent: dummyMessagesTime(1) },
    { username: 'chat admin', message: `${dummyUser1} has left the room`, timeSent: dummyMessagesTime(0) },
  ])
  const [allInRoom, setAllInRoom] = useState('')

  // let newUsername = props.location.props.userName
  // let room = props.location.props.room
  // let colour = props.location.props.colour
  let newUsername = 'cuong'
  let room = 'chatroom'
  let colour = 'purple'

  useEffect(() => {
    socket = io('http://localhost:5000/')
    console.log(socket)

    socket.emit('join', { newUsername, room, colour }, (error) => {
      if (error) {
        console.log(error)
        alert(error)
      }
    })

    //set interval function that maps through the dummy messages array and emmits each element of this array to chatroom
    socket.emit('sendMsg', { message: 'test dummy', room, colour: "blue" }, () => { })

    // provides disconnect when unmounting the component
    // return () => {
    //   socket.emit('disconnect')
    //   socket.off()
    // }
  }, [props.location])

  useEffect(() => {
    socket.on('msg', (userMsg) => {
      setAllMsg(allMsg => [...allMsg, userMsg])
    })

    socket.on('getAllUsers', ({ users }) => {
      console.log('getalluseres useeffect')
      setAllInRoom(users)
    })
  }, [])

  //a function to send a user Message using the 'sendMsg' event on the back
  const sendMsg = (e) => {
    e.preventDefault()
    if (userMsg) {
      socket.emit('sendMsg', { message: userMsg, room }, () => setUserMsg(''))
    }
  }

  return (
    <div>
      <div
        className="colour-banner"
        style={{
          backgroundColor: colour.toString()
        }}
      ></div>

      <Grid textAlign='center' style={{ height: '100vh', minWidth: 380, }} verticalAlign='middle'>
        <Grid.Column
          width={9}
          style={{ maxHeight: 700, maxWidth: 1000, minWidth: 380, mixWidth: 900, }}>
          <Segment stacked>
            <ChatRoomHeader />
            <Grid className='wrapper' stackable columns={2}>
              <Grid.Column width={12}>
                <Segment>
                  <Grid padded >
                    <Grid.Row >
                      <Grid.Column><p>Chat Room Messages</p></Grid.Column>
                    </Grid.Row>
                    <ChatContent allMsg={allMsg} currentUser={newUsername} />
                    <ChatForm userMsg={userMsg} setUserMsg={setUserMsg} sendMsg={sendMsg} />
                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                <Users allInRoom={allInRoom} />
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column >
      </Grid >
      <button onClick={e => sendMsg(e)}>send</button>
      <button onClick={() => console.log(userMsg)}>userMsg</button>
      <button onClick={() => console.log(allMsg)}>allMsg</button>
      <button onClick={() => console.log(allInRoom)}>allInRoom</button>

      <button onClick={() => allInRoom[0].label = 'red'}>allInRoom change</button>

      <button onClick={() => console.log(allInRoom)}>allInRoom</button>
      <button onClick={() => console.log(props)}>props</button>
    </div >
  )
}
