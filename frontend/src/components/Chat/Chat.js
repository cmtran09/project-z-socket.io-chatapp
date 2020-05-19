import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'

import io from 'socket.io-client'

let socket

export default function Chat(props) {

  const [userMsg, setUserMsg] = useState('')
  const [allMsg, setAllMsg] = useState([{ username: 'tom', message: 'hwllo' }, { username: 'tom', message: 'my' }, { username: 'tom', message: 'name' }, { username: 'tom', message: 'is' }, { username: 'tom', message: 'a' }, { username: 'tom', message: 'test' }])
  // const [userName, setUserName] = useState('')

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
    })

    // provides disconnect when unmounting the component
    return () => {
      socket.emit('disconnect')
      socket.off()
    }
    // socket.on('connect', () => {
    //   socket.send('hi')
    //   socket.on('message', (msg) => {

    //   })
  }, [])

  useEffect(() => {
    socket.on('msg', (userMsg) => {
      setAllMsg([...allMsg, userMsg])
    })
  }, [allMsg])

  //a functiont to send a user Message using the 'sendMsg' event on the back
  const sendMsg = (e) => {
    e.preventDefault()
    if (userMsg) {
      console.log('userMsg', userMsg)
      socket.emit('sendMsg', { message: userMsg, room }, () => setUserMsg(''))
    }
  }

  console.log("userMsg", userMsg, 'allMsg', allMsg)

  return (
    <div>
      <div className='main-app'>
        hello world caht compneont
      </div>
      {allMsg.map((elem, i) => <p key={i}>{`${elem.message}: by ${elem.username}`}</p>)}
      <input
        onChange={e => setUserMsg(e.target.value)} type="text" placeholder="your message" value={userMsg}
        onKeyPress={e => e.key === 'Enter' ? sendMsg(e) : null}
      />
      <button onClick={e => sendMsg(e)}>send</button>
      <button onClick={e => console.log(userMsg)}>userMsg</button>
      <button onClick={e => console.log(allMsg)}>allMsg</button>
      <button onClick={e => console.log(props.location.props.username)}>props</button>
    </div>
  )
}
