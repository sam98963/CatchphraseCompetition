import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
const fileName = "users.json";

export async function getUsers() {
  const response = await fs.readFile(fileName);
  const data = JSON.parse(response);

  if (data.length === 0) {
    return null;
  }
  return data;
}
// Read json
// parse
// return data
export async function getUserByID(id) {
  const response = await fs.readFile(fileName);
  const data = JSON.parse(response);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i];
    } else {
    }
  }
  return null;
}
// Read json
// parse
// for loop and match id - else throw error
// return data[i]
export async function createUser(newUser) {
  const response = await fs.readFile(fileName);
  const data = JSON.parse(response);
  const userObject = { id: uuidv4(), ...newUser };
  console.log(newUser);
  if (
    newUser.first_name === "" ||
    newUser.last_name === "" ||
    newUser.email === "" ||
    newUser.catchphrase === ""
  ) {
    return null;
  }

  data.push(userObject);
  await fs.writeFile(fileName, JSON.stringify(data), "utf-8");
  return userObject;
}
// Read json
// parse
// create data object {id: uuidv4, ...newUser}
// stringify
// write to file (destination, file to write, utf-8)
// return new user
export async function updateUserByID(id, updatedUser) {
  const response = await fs.readFile(fileName);
  const data = JSON.parse(response);
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      data[i] = updatedUser;
      await fs.writeFile(fileName, JSON.stringify(data), "utf-8");
      return data[i];
    } else {
    }
  }
  return null;
}
// read
// parse
// for loop
// update data to be updated data (data[i] = {id:id, ...updatedUser})
// stringify
// write
// return updated user
export async function deleteUserByID(id) {
  const response = await fs.readFile(fileName);
  const data = JSON.parse(response);
  // console.log(data)
  let deletedUser = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      let deletedUser = data.splice(i, 1);
      await fs.writeFile(fileName, JSON.stringify(data), "utf-8");
      // console.log(deleted);
      return deletedUser[0];
    } else {
      // console.log(deletedUser);
      return deletedUser;
    }
  }
}
// deleteUserByID("ca1af314-357f-4c09-b7b3-9572af6ec13d");
