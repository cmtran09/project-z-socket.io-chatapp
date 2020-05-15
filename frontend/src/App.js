import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ReactDOM from 'react-dom'

import './styles/styles.scss'

import Home from './components/Home/Home'
import Chat from './components/Chat/Chat'
import Header from './components/Header/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/" component={Home} />
      <Route path="/chat" component={Chat} />
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)