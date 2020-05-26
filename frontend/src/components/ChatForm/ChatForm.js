import React from 'react'

import { Button, Image, Form, Header, Grid, List, Container, Message, Segment, Divider, TextArea, Input } from 'semantic-ui-react'
import './ChatForm.scss'

export default function ChatForm() {
  return (
    <Grid.Row>
      <Grid.Column>
        <Grid>
          <Grid.Column>
            <Form.Input
              focus
              widths='equal'
              placeholder='Your Message'
            />
          </Grid.Column>
          <Grid.Column>
            <Button color='green'>Send</Button>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid.Row>
  )
}
