const users = []

const addUser = ({ id, newUsername }) => {

  console.log("cont", newUsername)
  console.log("cont", typeof (newUsername))
  newUsername = newUsername.toLowerCase()

  const sameUser = users.find((user) => {
    user.newUsername === newUsername
    return true
  })
  if (sameUser) {
    return { error: 'Username is taken' }
  }

  const user = { id, user: newUsername }
  users.push(user)
  console.log(users)
  return user
}

const findUser = (id) => users.find(user => user.id === id)

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id)
  if (index) {
    return users.splice(index, 1)[0]
  }
}

module.exports = {
  addUser,
  findUser,
  removeUser
}