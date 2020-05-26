import React from 'react'

import { Button, Form, Grid } from 'semantic-ui-react'
import './ChatForm.scss'

export default function ChatForm({ userMsg, setUserMsg, sendMsg }) {
  return (
    <Grid.Row>
      <Grid.Column>
        <Form >
          <Form.Group unstackable widths='equal'>
            <Form.Input focus className='left-input' fluid placeholder='Your Message'
              onChange={e => setUserMsg(e.target.value)} type="text" placeholder="Your Message" value={userMsg}
              onKeyPress={e => e.key === 'Enter' ? sendMsg(e) : null}
            />
            <Button className='send-button' color='green' onClick={e => sendMsg(e)}>Send</Button>
          </Form.Group>
        </Form>
      </Grid.Column>
    </Grid.Row >
  )
}
