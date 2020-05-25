import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Button, Form, Grid, Header, Container, Message, Segment, Divider } from 'semantic-ui-react'
import { SketchPicker, TwitterPicker, CirclePicker } from 'react-color'


export default function Home() {

  const [user, setUser] = useState({ room: 'chatroom' })
  const [colour, setColour] = useState('')

  const selectColour = (e) => {
    e.preventDefault()
    console.log('hi')
    setColour(e)
  }

  console.log(user)

  return (
    <div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Join Chat Room
          </Header>
          <Header as='h4' color='teal' textAlign='center'>
            Built using Socket.io, Node.js, Express and React
          </Header>
          <Form size='large' >
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' />
              <Message
                color='brown'
                content='You must select a username'
              />
              <Message
                color='brown'
                content='You must select unique username - someone inside currently has the same username'
              />
              <Divider horizontal>
                <Header as='h4' color='grey'>
                  Colour
                </Header>
              </Divider>
              <Container textAlign='center'>
                <CirclePicker circleSize={30} width={400} triangle={top} onChangeComplete={e => selectColour(e.target.value)} />
                <Message
                  color='brown'
                  content='You must select a colour'
                />
              </Container >
              <Link onClick={e => !user ? e.preventDefault() : null} to={
                {
                  pathname: '/chat',
                  props: {
                    'userName': user,
                    'room': 'chatroom'
                  }
                }
              }>
                <Button className="join" color='teal' fluid size='large'>
                  Enter
              </Button>
              </Link>
            </Segment>
          </Form>

          {/* <Message>
            New to us? <a href='#'>Sign Up</a>
          </Message> */}
        </Grid.Column>
      </Grid>

    </div>
  )
}
