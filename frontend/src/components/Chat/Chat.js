import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'

import io from 'socket.io-client'

let socket

export default function Chat(props) {

  const [userMsg, setUserMsg] = useState('')
  const [allMsg, setAllMsg] = useState([{ username: 'tom', message: 'hello' }, { username: 'tom', message: 'my' }, { username: 'tom', message: 'name' }, { username: 'tom', message: 'is' }, { username: 'tom', message: 'a' }, { username: 'tom', message: 'test' }])
  // const [userName, setUserName] = useState('')

  const [allInRoom, setAllInRoom] = useState('')

  let newUsername = props.location.props.userName
  let room = props.location.props.room
  console.log(props)
  console.log(newUsername)
  console.log(room)
  // console.log('username', userName)

  useEffect(() => {
    // setUserName(user)
    socket = io('http://localhost:5000/')
    console.log(socket)

    socket.emit('join', { newUsername, room }, (error) => {
      console.log(error)
      alert(error)
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
      <div className='main-app'>
        hello world chat component
      </div>
      {allMsg.map((elem, i) => <p key={i}>{`${elem.message}: by ${elem.username}`}</p>)}
      <input
        onChange={e => setUserMsg(e.target.value)} type="text" placeholder="your message" value={userMsg}
        onKeyPress={e => e.key === 'Enter' ? sendMsg(e) : null}
      />
      <button onClick={e => sendMsg(e)}>send</button>
      <button onClick={() => console.log(userMsg)}>userMsg</button>
      <button onClick={() => console.log(allMsg)}>allMsg</button>
      <button onClick={() => console.log(allInRoom)}>allInRoom</button>
      <button onClick={() => console.log(props.location.props.username)}>props</button>
      <h1>users</h1>
      {allInRoom &&
        allInRoom.map((elem, i) => {
          return (
            <p key={i}>{elem.username}</p>
          )
        })
      }
    </div>
  )
}
