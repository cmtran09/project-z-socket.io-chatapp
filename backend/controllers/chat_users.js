const moment = require('moment')
const users = []

const addUser = ({ id, newUsername }) => {

  console.log("cont", newUsername)
  console.log("cont", typeof (newUsername))

  newUsername = newUsername.toLowerCase()

  const sameUser = users.find((user) => user.username === newUsername)

  if (!newUsername) {
    console.log('username required')
    return { error: 'Username required' }
  }

  if (sameUser) {
    console.log('error same username')
    return { error: 'Username is taken' }
  }

  const user = { id, username: newUsername, timeJoined: moment().format('DD MM YYYY HH:mm:ss'), lastActive: moment().format('DD MM YYYY HH:mm:ss'), label: null }
  users.push(user)
  console.log("users array", users)
  return { user }
}

const findUser = (id) => users.find(user => user.id === id)

const updateLastActive = (user) => {
  return user.lastActive = moment().format('DD MM YYYY HH:mm:ss')
}

const setAvailibilty = () => {
  const currentTime = moment().format('DD MM YYYY HH:mm:ss')
  users.map(elem => {
    const ms = moment(currentTime, 'DD MM YYYY HH:mm:ss').diff(moment(elem.lastActive, 'DD MM YYYY HH:mm:ss'))
    const duration = moment.duration(ms);

    if (duration._data.seconds > 60) {
      console.log('inactive longer than 60 seconds')
      return elem.label = 'red'
    } else if (duration._data.seconds > 30) {
      console.log('inactive longer than 30 seconds')
      return elem.label = 'amber'
    } else return elem.label = 'green'
  })
}

const availibitlyInterval = setInterval(
  setAvailibilty
  , 10000
)

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id)
  console.log("remove user index:", index)
  if (index !== -1) {
    console.log('logging users array before splice', users)
    return (
      users.splice(index, 1)[0]
    )
  }
}

const getAllUsers = () => users

module.exports = {
  addUser,
  findUser,
  getAllUsers,
  removeUser,
  updateLastActive
}