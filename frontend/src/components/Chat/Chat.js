import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'
import moment from 'moment'

import io from 'socket.io-client'

let socket

export default function Chat(props) {

  const [userMsg, setUserMsg] = useState('')
  const [allMsg, setAllMsg] = useState([{ username: 'tom', message: 'hello' }, { username: 'tom', message: 'my' }, { username: 'tom', message: 'name' }, { username: 'tom', message: 'is' }, { username: 'tom', message: 'a' }, { username: 'tom', message: 'test' }])
  const [allInRoom, setAllInRoom] = useState('')

  let newUsername = props.location.props.userName
  let room = props.location.props.room

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

  const availibilty = (lastActive) => {
    const currentTime = moment().format('DD MM YYYY HH:mm:ss')
    console.log("lasldsjkashsdjhfgasjkhdgfkjhasgdfkjhasgdkjfhagsjkdhfgajkhsdg")
    console.log('lastActive', lastActive)
    console.log('currentTime', currentTime)
    console.log("==============================")

    const ms = moment(currentTime, 'DD MM YYYY HH:mm:ss').diff(moment(lastActive, 'DD MM YYYY HH:mm:ss'))
    const duration = moment.duration(ms);

    if (duration._data.seconds > 15) {
      console.log('longer than 30 seconds')
      return 'red'
    } else return 'green'
    // console.log('result ddddd', duration._data.seconds)

    // console.log('result', s)
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

      <button onClick={() => allInRoom[0].label = 'red'}>allInRoom change</button>

      <button onClick={() => console.log(allInRoom)}>allInRoom</button>
      <button onClick={() => console.log(props.location.props.username)}>props</button>
      <h1>users</h1>
      <p>{`current time: ${moment().format('DD MM YYYY HH:mm:ss')}`}</p>
      {allInRoom &&
        allInRoom.map((elem, i) => {
          return (
            <p key={i}>{`${elem.username} last seen colour is ${availibilty(elem.lastActive)}`}</p>
          )
        })
      }
    </div>
  )
}
