import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Button, Form, Grid, Header, Container, Message, Segment, Divider } from 'semantic-ui-react'
import { CirclePicker } from 'react-color'


export default function Home() {

  const [user, setUser] = useState('')
  const [colour, setColour] = useState('')

  // errors
  const [noColour, setNoColour] = useState(false)
  const [noUser, setNoUser] = useState(false)
  const [duplicateUser, setDuplicateUser] = useState(false)

  const clearErrors = () => {
    setNoColour(false)
    setNoUser(false)
    setNoDuplicateUser(false)
  }

  const showErrors = (e) => {
    e.preventDefault()
    if (!user) setNoUser(true)
    if (!colour) setNoColour(true)
    // write function to show there is a duplicate user inside
    // if(!user) setDuplicateUser(true)
    return
  }

  return (
    <div>
      <div
        className="colour-banner"
        style={{
          backgroundColor: colour.toString()
        }}
      ></div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            A Simple Chat Room
          </Header>
          <Header as='h4' color='teal' textAlign='center'>
            Built using Socket.io, Node.js, Express and React
          </Header>
          <Form size='large' >
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' onChange={e => {
                setUser(e.target.value)
                clearErrors()
              }} />
              {noUser && <Message
                color='brown'
                content='You must select a username'
              />}
              {duplicateUser && <Message
                color='brown'
                content='You must select unique username - someone inside currently has the same username'
              />}
              <Divider horizontal>
                <Header as='h4' color='grey'>
                  Colour
                </Header>
              </Divider>
              <Container textAlign='center'>
                <CirclePicker circleSize={30} width={400} triangle={top} onChangeComplete={e => setColour(e.hex)} />
                {noColour &&
                  <Message
                    color='brown'
                    content='You must select a colour'
                  />}
              </Container >
              <Link onClick={e => (!user || !colour) ? showErrors(e) : null} to={
                {
                  pathname: '/chat',
                  props: {
                    'userName': user,
                    'room': 'chatroom',
                    'colour': colour
                  }
                }
              }>
                <Button className="join" color='teal' fluid size='large'>
                  Enter
              </Button>
              </Link>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div >
  )
}
