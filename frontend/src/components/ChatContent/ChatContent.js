import React from 'react'

import { Button, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'
import './ChatContent.scss'

import EveryoneElsesBubble from '../EveryoneElsesBubble/EveryoneElsesBubble'
import UserBubble from '../UserBubble/UserBubble'
import AdminBubble from '../AdminBubble/AdminBubble'

export default function ChatContent({ allMsg, currentUser }) {
  console.log('currentUser', currentUser)
  return (
    <Grid.Row >
      <Grid.Column>
        <Container
          style={{
            overflow: 'auto',
            maxHeight: 300
          }}
          className="contents"
          textAlign='justified'>
          {allMsg.map((elem, i) => {
            console.log('elem.username', elem.username)
            if (elem.username === currentUser) {
              return (
                <UserBubble key={i} message={elem} />
              )
            } else if (elem.username === 'chat admin') {
              return (
                <AdminBubble key={i} message={elem} />
              )
            } else {
              return (
                <EveryoneElsesBubble key={i} message={elem} />
              )
            }
          })}
        </Container>
      </Grid.Column>
    </Grid.Row>
  )
}
