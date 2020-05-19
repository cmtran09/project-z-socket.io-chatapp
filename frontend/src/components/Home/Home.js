import React, { useState } from 'react'
import { Link } from "react-router-dom"


export default function Home() {

  const [user, setUser] = useState({ room: 'chatroom' })

  return (
    <div>
      hello home
      <input onChange={e => setUser(e.target.value)} type="text" placeholder="your username" />
      <Link onClick={e => !user ? e.preventDefault() : null} to={
        {
          pathname: '/chat',
          props: {
            'userName': user,
            'room': 'chatroom'
          }
        }
      }>
        <button>join</button>
        <button onClick={e => console.log(user)}>log</button>
      </Link>
    </div>
  )
}
