import React from 'react'

import './AdminBubble.scss'

export default function AdminBubble({ message }) {
  return (
    <blockquote
      className="speech-bubble admin-bubble"
      style={{
        textAlign: 'center'
      }}
    >
      <p className='bubble-text'>{message.message}</p>
      <cite className='admin-cite'>{message.username}</cite>
    </blockquote>

  )
}
