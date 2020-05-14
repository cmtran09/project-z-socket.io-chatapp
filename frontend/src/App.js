import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import './styles/styles.scss'

const App = () => {


  return (
    <div>
      <p className='cmtran09head'>
        Project Z - Socket.io - chatapp
      </p>

      <div className='main-app'>
        hello world
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)