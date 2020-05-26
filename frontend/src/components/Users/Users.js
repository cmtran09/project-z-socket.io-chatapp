import React from 'react'
import './Users.scss'
import { Button, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'


export default function Users({ allInRoom }) {
  return (
    <Grid.Column
      width={4}
    >
      <Segment>
        <Header as='h4' color='teal' textAlign='center'>
          current members hs
      </Header>
        <List animated verticalAlign='middle'>
          {allInRoom &&
            allInRoom.map((elem, i) => {
              return (
                <List.Item key={i} className="">
                  <List.Content>
                    <List.Header>{`${elem.username} `}</List.Header>
                    <p>{elem.label === 'red' ? '🔴' : elem.label === 'amber' ? '🟠' : '🟢'}</p>
                  </List.Content>
                </List.Item>
              )
            })
          }
        </List>
      </Segment>
    </Grid.Column>
            </Grid >
  )
}
