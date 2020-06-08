import React from 'react'

import './UserBubble.scss'

export default function UserBubble({ message }) {
  console.log(message)
  return (
    <blockquote
      className="speech-bubble user-bubble"
      style={{ backgroundColor: message.colour, textAlign: 'right' }}
    >
      <p className='bubble-text'>{message.message}</p>
      <cite className='user-cite'>{`${message.username} Sent at: ${message.timeSent}`}</cite>
    </blockquote>
  )
}
