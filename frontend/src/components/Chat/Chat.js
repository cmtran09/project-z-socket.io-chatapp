import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'

import io from 'socket.io-client'

let socket

export default function Chat(props) {

  const [userMsg, setUserMsg] = useState('')
  const [allMsg, setAllMsg] = useState(['hwllo', 'my', 'name', 'is', 'a', 'test'])

  let user = props.location.props.username
  console.log("hi")

  useEffect(() => {
    socket = io('http://localhost:5000/')
    console.log(socket)

    socket.emit('join', { user: user }, ({ error }) => {
      alert(error)
    })

    // socket.on('connect', () => {
    //   socket.send('hi')
    //   socket.on('message', (msg) => {

    //   })
  }, [])

  return (
    <div>
      <div className='main-app'>
        hello world caht compneont
      </div>
      {allMsg.map((elem, i) => <p key={i}>{elem}</p>)}
      <input onChange={e => setUserMsg(e.target.value)} type="text" placeholder="your message" />
      <button onClick={e => console.log(userMsg)}>click</button>
      <button onClick={e => console.log(allMsg)}>click</button>
      <button onClick={e => console.log(props.location.props.username)}>props</button>
    </div>
  )
}
