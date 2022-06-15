import Users from './utils/users.js';

// create
// update
// delete

async function isAdmin(id) {
  const user = await Users.getUserById(id);

  return user.role === 'ADMIN';
}

async function getUserByEmail(email) {
  const user = await Users.getAllUsers();

  return user.find((user) => user.email === email);
}

async function getUserByName(name) {
  const user = await Users.getAllUsers();

  return user.find((user) => user.name === name);
}

async function getUSerByRole(role) {
  const user = await Users.getAllUsers();

  return user.find((user) => user.role === role);
}

async function getUserById(id) {
  const user = await Users.getUserById(id);

  return user;
}

async function getAllUsers() {
  const user = await Users.getAllUsers();

  return user;
}

async function createUser(data) {
  const user = await Users.createUser(data);

  return user;
}

async function updateUser(id, data) {
  const user = await Users.updateUser(id, data);

  return user;
}
