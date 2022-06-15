import fs from 'fs/promises';
import path from 'path';
import url from 'url';

const dirname = path.dirname(url.fileURLToPath(import.meta.url)); // Actual directory
const dataPath = path.join(dirname, '..', 'data'); // Data directory

// Function to load a file
async function loadFile(file) {
  // If no file is provided, throw an error
  if (!file) throw new Error('file is required');

  const filePath = path.join(dataPath, `${file}.json`); // Path to the file
  const data = await fs.readFile(filePath, 'utf8'); // Read the file

  return JSON.parse(data); // Return the parsed data
}

// Function to save a file
async function saveFile(file, data) {
  if (!file) throw new Error('file is required'); // If no file is provided, throw an error
  if (!data) throw new Error('data is required'); // If no data is provided, throw an error

  const filePath = path.join(dataPath, `${file}.json`); // Path to the file
  const dataString = JSON.stringify(data, null, 2); // Stringify the data

  await fs.writeFile(filePath, dataString); // Write the data to the file
}

async function fileExists(file) {
  if (!file) throw new Error('file is required'); // If no file is provided, throw an error

  const filePath = path.join(dataPath, `${file}.json`); // Path to the file

  // Return true if the file exists, false otherwise
  return fs
    .access(filePath)
    .then(() => true)
    .catch(() => false);
}

// Export the functions
export default {
  loadFile,
  saveFile,
  fileExists,
};
