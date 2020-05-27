import React, { useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import { Button, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'
import './ChatContent.scss'

import EveryoneElsesBubble from '../EveryoneElsesBubble/EveryoneElsesBubble'
import UserBubble from '../UserBubble/UserBubble'
import AdminBubble from '../AdminBubble/AdminBubble'

export default function ChatContent({ allMsg, currentUser }) {
  console.log('currentUser', currentUser)

  useEffect(() => {

  }, [])

  return (
    <Grid.Row >
      <Grid.Column>
        <ScrollToBottom
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
        </ScrollToBottom>
      </Grid.Column>
    </Grid.Row>
  )
}
