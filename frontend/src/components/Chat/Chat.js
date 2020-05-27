import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'
import { Button, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'
import moment from 'moment'

import io from 'socket.io-client'

import './Chat.scss'

import Users from '../Users/Users'
import ChatContent from '../ChatContent/ChatContent'
import ChatForm from '../ChatForm/ChatForm'

let socket

export default function Chat(props) {

  const [userMsg, setUserMsg] = useState('')
  const [allMsg, setAllMsg] = useState([{ username: 'tom', message: 'hello' }, { username: 'tom', message: 'my' }, { username: 'tom', message: 'name' }, { username: 'tom', message: 'is' }, { username: 'tom', message: 'a' }, { username: 'tom', message: 'test' }])
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

    socket.emit('join', { newUsername, room }, (error) => {
      if (error) {
        console.log(error)
        alert(error)
      }
    })

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
          style={{ maxHieght: 700, maxWidth: 1000, minWidth: 380, mixWidth: 900, }}>
          <Segment stacked>
            <Header as='h2' color='teal' textAlign='center'>
              A Simple Chat Room
            </Header>
            <Header as='h4' color='teal' textAlign='center'>
              Built using Socket.io, Node.js, Express and React
            </Header>
            <Grid className='wrapper' stackable columns={2}>
              <Grid.Column width={12}>
                <Segment>
                  <Grid padded >
                    <Grid.Row >
                      <Grid.Column><p>Chat Room Messages</p></Grid.Column>
                    </Grid.Row>
                    <ChatContent allMsg={allMsg} currentUser={newUsername}/>
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

      {allMsg.map((elem, i) => <p key={i}>{`${elem.message}: by ${elem.username}`}</p>)}
      <input
        onChange={e => setUserMsg(e.target.value)} type="text" placeholder="your message" value={userMsg}
        onKeyPress={e => e.key === 'Enter' ? sendMsg(e) : null}
      />
      <button onClick={e => sendMsg(e)}>send</button>
      <button onClick={() => console.log(userMsg)}>userMsg</button>
      <button onClick={() => console.log(allMsg)}>allMsg</button>
      <button onClick={() => console.log(allInRoom)}>allInRoom</button>

      <button onClick={() => allInRoom[0].label = 'red'}>allInRoom change</button>

      <button onClick={() => console.log(allInRoom)}>allInRoom</button>
      <button onClick={() => console.log(props)}>props</button>
      <h1>users</h1>
      <p>{`current time: ${moment().format('DD MM YYYY HH:mm:ss')}`}</p>
      {
        allInRoom &&
        allInRoom.map((elem, i) => {
          return (
            <div key={i} className="">
              <p>{`${elem.username} `}</p>
              <p>{elem.label === 'red' ? '🔴' : elem.label === 'amber' ? '🟠' : '🟢'}</p>
            </div>
          )
        })
      }
    </div >
  )
}
