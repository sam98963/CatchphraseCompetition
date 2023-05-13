


import express from "express";

const app = express();
const port = 3000;

import {
  getUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
} from "./users.js";

app.use(express.json());

// app.use("/", (req, res) => {
//   res.json({
//     status: true,
//     payload: "This route works!",
//   });
// });

// .get for all users { success: true, payload: array of user objects }
app.get("/api/users", async (req, res) => {
  const allUsers = await getUsers();
  res.send({ success: true, payload: allUsers });
});

// .get for get user by id { success: true, payload: user object }
app.get("/api/users/:id", async (req, res) => {
  const userID = req.params.id;
  const oneUser = await getUserByID(userID);
  res.send({ success: true, payload: oneUser });
});

// .post for new user (generate i.d within helper function using uuidv4) { success: true, payload: newly created user object }
app.post("/api/users", async (req, res) => {
  const user = req.body;
  const newUser = await createUser(user);
  res.send({ success: true, payload: newUser });
});

// .patch for updateUserById .body and .id to be passed into helper function. { success: true, payload: new user object (after replacement) }
app.patch("/api/users/:id", async (req, res) => {
  const userID = req.params.id;
  const user = req.body;
  const newUser = await updateUserByID(userID, user);
  res.send({ success: true, payload: newUser });
});

// .delete for delete user by Id { success: true, payload: deleted user }
app.delete("/api/users/:id", async (req, res) => {
  const userID = req.params.id;
  const deletedUser = await deleteUserByID(userID);
  res.send({ success: true, payload: deletedUser });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
