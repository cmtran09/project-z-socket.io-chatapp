import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'

import io from 'socket.io-client'

let socket

export default function Chat(props) {

  const [userMsg, setUserMsg] = useState('')
  const [allMsg, setAllMsg] = useState(['hwllo', 'my', 'name', 'is', 'a', 'test'])
  // const [userName, setUserName] = useState('')

  let user = props.location.props.userName
  let room = props.location.props.room
  console.log(props)
  console.log(user)
  console.log(room)
  // console.log('username', userName)

  useEffect(() => {
    // setUserName(user)
    socket = io('http://localhost:5000/')
    console.log(socket)

    socket.emit('join', { user, room }, ({ error }) => {
      alert(error)
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
      socket.emit('sendMsg', userMsg, () => setUserMsg(''))
    }
  }

  console.log("userMsg", userMsg, 'allMsg', allMsg)

  return (
    <div>
      <div className='main-app'>
        hello world caht compneont
      </div>
      {allMsg.map((elem, i) => <p key={i}>{elem}</p>)}
      <input onChange={e => setUserMsg(e.target.value)} type="text" placeholder="your message" />
      <button onClick={e => sendMsg(e)}>send</button>
      <button onClick={e => console.log(userMsg)}>userMsg</button>
      <button onClick={e => console.log(allMsg)}>allMsg</button>
      <button onClick={e => console.log(props.location.props.username)}>props</button>
    </div>
  )
}
