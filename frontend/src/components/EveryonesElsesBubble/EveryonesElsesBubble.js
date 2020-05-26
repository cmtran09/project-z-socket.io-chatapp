import React from 'react'

import './EveryonesElsesBubble.scss'

export default function EveryonesElsesBubble({ message }) {
  return (
    <blockquote
      class="speech-bubble"
      style={{ color: 'red' }}
    >
      <p>{message.message}</p>
      <cite>{message.username}</cite>
    </blockquote>
  )
}
