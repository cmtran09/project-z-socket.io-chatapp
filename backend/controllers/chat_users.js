const users = []

const addUser = ({ id, name }) => {

  console.log("cont", name)
  console.log("cont", typeof (name))
  // name = name.toLowerCase()

  // const sameUser = users.find((user) => {
  //   user.name === name
  //   return true
  // })
  // if (sameUser) {
  //   return { error: 'Username is taken' }
  // }

  const user = { id, name }
  users.push(user)
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