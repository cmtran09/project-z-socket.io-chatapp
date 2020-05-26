import React from 'react'
import './Users.scss'
import { Button, Popup, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'

import moment from 'moment'

export default function Users({ allInRoom }) {

  // add function to calculate time last active in seconds on hover

  return (
    <Segment>
      {/* <Header as='p' color='teal' textAlign='center'> */}
      <p>Users In Room</p>
      {/* </Header> */}
      <List animated verticalAlign='middle'>
        {allInRoom &&
          allInRoom.map((elem, i) => {
            return (
              <Popup
                key={i}
                trigger={
                  <List.Item className="">
                    <List.Content>
                      <List.Header>{`${elem.username} `}{elem.label === 'red' ? '🔴' : elem.label === 'amber' ? '🟠' : '🟢'}</List.Header>
                    </List.Content>
                  </List.Item>
                }>
                <Popup.Header>Last Active: {elem.lastActive}</Popup.Header>
                <Popup.Content>
                </Popup.Content>
              </Popup>
            )
          })
        }
      </List>
    </Segment>
  )
}
