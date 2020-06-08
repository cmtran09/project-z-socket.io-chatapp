import React from 'react'

import './EveryoneElsesBubble.scss'

export default function EveryoneElsesBubble({ message }) {
  console.log(message)
  return (
    <blockquote
      className="speech-bubble everyone-else-bubble"
      style={{ backgroundColor: message.colour }}
    >
      <p className='bubble-text'>{message.message}</p>
      <cite className='everyone-else-cite'>{`${message.username} Sent at: ${message.timeSent}`}</cite>
    </blockquote>
  )
}
