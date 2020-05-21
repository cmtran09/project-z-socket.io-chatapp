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

  const user = { id, username: newUsername, timeJoined: moment().format('DD MM YYYY HH:mm:ss'), lastActive: moment().format('DD MM YYYY HH:mm:ss') }
  users.push(user)
  console.log("users array", users)
  return { user }
}

const findUser = (id) => users.find(user => user.id === id)

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id)
  console.log("remove user index:", index)
  if (index !== -1) {
    console.log('logging users array before splice', users)
    // console.log('logging the spliced element', users.splice(index, 1))
    // console.log('logging the spliced []with [0]', users.splice(index, 1)[0])
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
  removeUser
}