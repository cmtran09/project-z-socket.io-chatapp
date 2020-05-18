import React, { useState } from 'react'
import { Link } from "react-router-dom"


export default function Home() {

  const [user, setUser] = useState('')

  return (
    <div>
      hello home
      <input onChange={e => setUser(e.target.value)} type="text" placeholder="your username" />
      <Link onClick={e => !user ? e.preventDefault() : null} to={
        {
          pathname: '/chat',
          props: { 'username': user }
        }
      }>
        <button>join</button>
      </Link>
    </div>
  )
}
