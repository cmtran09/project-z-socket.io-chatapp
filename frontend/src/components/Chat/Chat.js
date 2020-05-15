import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'

import io from 'socket.io-client'

let socket

export default function Chat() {
  console.log("hi")

  useEffect(() => {
    socket = io('http://localhost:5000/')
    console.log(socket)
  }, [])

  return (
    <div>
      <div className='main-app'>
        hello world caht compneont
        </div>
    </div>
  )
}
