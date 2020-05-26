import React, { useState, useEffect } from 'react'
import '../../styles/styles.scss'
import { Button, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'
import moment from 'moment'

import io from 'socket.io-client'

let socket

export default function Chat(props) {

  const [userMsg, setUserMsg] = useState('')
  const [allMsg, setAllMsg] = useState([{ username: 'tom', message: 'hello' }, { username: 'tom', message: 'my' }, { username: 'tom', message: 'name' }, { username: 'tom', message: 'is' }, { username: 'tom', message: 'a' }, { username: 'tom', message: 'test' }])
  const [allInRoom, setAllInRoom] = useState('')

  // let newUsername = props.location.props.userName
  // let room = props.location.props.room
  // let colour = props.location.props.colour
  let newUsername = 'cuong'
  let room = 'chatroom'
  let colour = 'purple'

  useEffect(() => {
    socket = io('http://localhost:5000/')
    console.log(socket)

    socket.emit('join', { newUsername, room }, (error) => {
      if (error) {
        console.log(error)
        alert(error)
      }
    })

    // provides disconnect when unmounting the component
    // return () => {
    //   socket.emit('disconnect')
    //   socket.off()
    // }
  }, [props.location])

  useEffect(() => {
    socket.on('msg', (userMsg) => {
      setAllMsg(allMsg => [...allMsg, userMsg])
    })

    socket.on('getAllUsers', ({ users }) => {
      console.log('getalluseres useeffect')
      setAllInRoom(users)
    })
  }, [])

  //a function to send a user Message using the 'sendMsg' event on the back
  const sendMsg = (e) => {
    e.preventDefault()
    if (userMsg) {
      socket.emit('sendMsg', { message: userMsg, room }, () => setUserMsg(''))
    }
  }

  const availibilty = (lastActive) => {
    const currentTime = moment().format('DD MM YYYY HH:mm:ss')
    const ms = moment(currentTime, 'DD MM YYYY HH:mm:ss').diff(moment(lastActive, 'DD MM YYYY HH:mm:ss'))
    const duration = moment.duration(ms);

    if (duration._data.seconds > 15) {
      console.log('longer than 30 seconds')
      return 'red'
    } else return 'green'
  }

  return (
    <div>
      <div
        className="colour-banner"
        style={{
          backgroundColor: colour.toString()
        }}
      ></div>

      <Grid textAlign='center'
        style={{
          height: '100vh',
          minWidth: 380,
        }}
        verticalAlign='middle'>
        <Grid.Column
          width={9}
          style={{
            maxHieght: 700,
            maxWidth: 1000,
            minWidth: 380,
            mixWidth: 900,
          }}>
          <Segment stacked>
            <Header as='h2' color='teal' textAlign='center'>
              A Simple Chat Room
          </Header>
            <Header as='h4' color='teal' textAlign='center'>
              Built using Socket.io, Node.js, Express and React
          </Header>
            <Grid
              stackable
              columns={2}
            // style={{
            //   maxHieght: 200,
            //   minWidth: 200,
            // }}>
            >
              <Grid.Column
                width={12}
              // style={{
              //   // maxHieght: 200,
              //   maxWidth: 800,
              //   minWidth: 400
              // }}
              >
                <Segment>
                  <Grid padded >
                    <Grid.Row >
                      <Grid.Column>The ChatRoom</Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                      <Grid.Column>
                        <Container
                          style={{
                            overflow: 'auto',
                            maxHeight: 200
                          }}
                          className="contents"
                          textAlign='justified'>
                          <b>Justified</b>
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                          </p>
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                          </p>
                        </Container>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                      <Grid.Column>
                        <Grid>
                          <Grid.Column stretched={true}>
                            <Form>
                              <Input
                                focus
                                placeholder='Your Message'
                                style={{
                                  overflow: 'auto',
                                  maxWidth: 580
                                }}
                              />
                            </Form>
                          </Grid.Column>
                          <Grid.Column floated='right' >
                            <Button color='green'>Send</Button>
                          </Grid.Column>
                        </Grid>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
              <Grid.Column
                width={4}

              >
                <Segment>
                  <Header as='h4' color='teal' textAlign='center'>
                    current members
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
            </Grid>
          </Segment>
        </Grid.Column >
      </Grid >

      {/* <Grid textAlign='center'
        style={{
          height: '100vh',
        }}
        verticalAlign='middle'>
        <Grid.Column
          width={9}
          style={{
            backgroundColor: 'white',
            border: 'solid',
            maxHieght: 600,
            minWidth: 600,
          }}>
          <Segment stacked>
            <Header as='h2' color='teal' textAlign='center'>
              A Simple Chat Room
          </Header>
            <Header as='h4' color='teal' textAlign='center'>
              Built using Socket.io, Node.js, Express and React
          </Header>
            <Segment.Group horizontal>
              <Grid columns={2} divided>
                <Grid.Row width={1}>
                  <Grid.Column>
                    <Segment className="left">Left</Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Container className="contents" textAlign='justified'>
                      <b>Justified</b>
                      <Divider />
                      <p>
                        Lorem
                      </p>
                    </Container>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Form>
                      <TextArea placeholder='Tell us more' style={{ minHeight: 100 }} />
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid.Row width={1}>
                <Grid.Column>
                  <Segment>
                    <Header as='h2' color='teal' textAlign='center'>
                      current members
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
              </Grid.Row>
            </Segment.Group>
          </Segment>
        </Grid.Column>
      </Grid> */}


      {allMsg.map((elem, i) => <p key={i}>{`${elem.message}: by ${elem.username}`}</p>)}
      <input
        onChange={e => setUserMsg(e.target.value)} type="text" placeholder="your message" value={userMsg}
        onKeyPress={e => e.key === 'Enter' ? sendMsg(e) : null}
      />
      <button onClick={e => sendMsg(e)}>send</button>
      <button onClick={() => console.log(userMsg)}>userMsg</button>
      <button onClick={() => console.log(allMsg)}>allMsg</button>
      <button onClick={() => console.log(allInRoom)}>allInRoom</button>

      <button onClick={() => allInRoom[0].label = 'red'}>allInRoom change</button>

      <button onClick={() => console.log(allInRoom)}>allInRoom</button>
      <button onClick={() => console.log(props)}>props</button>
      <h1>users</h1>
      <p>{`current time: ${moment().format('DD MM YYYY HH:mm:ss')}`}</p>
      {
        allInRoom &&
        allInRoom.map((elem, i) => {
          return (
            <div key={i} className="">
              <p>{`${elem.username} `}</p>
              <p>{elem.label === 'red' ? '🔴' : elem.label === 'amber' ? '🟠' : '🟢'}</p>
            </div>
          )
        })
      }
    </div >
  )
}
