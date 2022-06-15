import Storage from './storage.js';

/**
 * @typedef User
 *
 * @property {number} id - The user id
 * @property {string} name - The user name
 * @property {string} email - The user email
 * @property {string} password - The user password
 * @property {'ADMIN' | 'USER'} role - The user role
 */

const USER_FILE = 'users'; // The name of the file where the users are stored
const INITIAL_USERS = {
  nextId: 1,
  data: [],
};

/**
 * Returns the list of all saved users
 *
 * @returns {Promise<User[]>}
 */
async function getAllUsers() {
  try {
    const users = await Storage.loadFile('users'); // Load the users file

    return users.data; // Return the users
  } catch (_error) {
    return []; // If an error occurs, return an empty array
  }
}

/**
 * Returns the user with the provided id or null if no user is found
 *
 * @param {number} id - The user id
 * @returns {Promise<User | null>}
 */
async function getUserById(id) {
  try {
    const users = await getAllUsers(); // Load the users file

    return users.data.find((user) => user.id === id); // Return the user with the provided id
  } catch (_error) {
    return null; // If an error occurs, return null
  }
}

/**
 * Creates a new user
 *
 * @param {User} data
 */
async function createUser(data) {
  const usersFileExists = await Storage.fileExists(USER_FILE); // Check if the users file exists
  const users = usersFileExists ? await getAllUsers() : INITIAL_USERS; // Load the users file if it exists, otherwise create an empty array

  delete data.id; // Delete the id from the data

  const newUser = {
    id: users.nextId, // Set the id to the next available id
    ...data, // Set the other properties to the provided data
  };

  // Save the new user to the users file
  await Storage.saveFile('users', {
    ...INITIAL_USERS,
    nextId: users.nextId + 1,
    data: [...users.data, newUser],
  });
}

/**
 * Updates an user by id
 * 
 * @param {number} id - The user id
 * @param {User} data 
 */
async function updateUser(id, data) {
  const user = await getUserById(id); // Load the user with the provided id

  if (!user) throw new Error('User not found'); // If no user is found, throw an error

  delete data.id; // Delete the id from the data

  const users = await getAllUsers(); // Load the users file

  // Save the updated user to the users file
  await Storage.saveFile('users', {
    ...users,
    data: users.data.map((user) => (user.id === id ? { ...user, ...data } : user)),
  });
}

/**
 * Deletes an user by id
 * 
 * @param {number} id 
 */
async function deleteUser(id) {
  const user = await getUserById(id); // Load the user with the provided id

  if (!user) throw new Error('User not found'); // If no user is found, throw an error

  const users = await getAllUsers(); // Load the users file

  // Save the updated user to the users file
  await Storage.saveFile('users', {
    ...users,
    data: users.data.filter((user) => user.id !== id),
  });
}

// Export the functions
export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
