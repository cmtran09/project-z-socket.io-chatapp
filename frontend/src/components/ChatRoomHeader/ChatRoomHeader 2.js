import React from 'react'

import { Button, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'

import './ChatRoomHeader.scss'

export default function ChatRoomHeader() {
  return (
    <React.Fragment>
      <Header as='h2' color='teal' textAlign='center'>
        A Simple Chat Room
      </Header>
      <Header as='h4' color='teal' textAlign='center'>
        Built using Socket.io, Node.js, Express and React
      </Header>
    </React.Fragment>
  )
}
