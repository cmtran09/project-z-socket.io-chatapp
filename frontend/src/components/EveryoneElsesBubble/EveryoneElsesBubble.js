import React from 'react'

import './EveryoneElsesBubble.scss'

export default function EveryoneElsesBubble({ message }) {
  console.log(message)
  return (
    <blockquote
      className="speech-bubble"
    // style={{ color: 'red' }}
    >
      <p className='bubble-text'>{message.message}</p>
      <cite className='everyone-else-cite'>{message.username}</cite>
    </blockquote>
  )
}
