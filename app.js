/*
if(const !== null {
  return res.status(200).json({ success: true, payload: response})
} else {
  return res.status(400).json({ success: false, payload: null})
}

*/

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

app.use(express.static("public"));
app.use(express.json());

// app.use("/", (req, res) => {
//   res.json({
//     status: true,
//     payload: "This route works!",
//   });
// });

// .get for all users { success: true, payload: array of user objects }
app.get("/api/users", async (req, res) => {
  const payload = await getUsers();
  const success = payload !== null;

  if (success) {
    return res.json({ success: success, payload: payload });
  }

  res.status(400).json({ success: success, payload: null });
});

// .get for get user by id { success: true, payload: user object }
app.get("/api/users/:id", async (req, res) => {
  const userID = req.params.id;
  const payload = await getUserByID(userID);
  const success = payload !== null;

  if (success) {
    return res.json({ success: success, payload: payload });
  }

  res.status(404).json({ success: success, payload: null });
});

// .post for new user (generate i.d within helper function using uuidv4) { success: true, payload: newly created user object }
app.post("/api/users", async (req, res) => {
  const user = req.body;
  const payload = await createUser(user);
  const success = payload !== null;

  if (success) {
    return res.json({ success: success, payload: payload });
  }

  res.status(400).json({ success: success, payload: null });
});

// .patch for updateUserById .body and .id to be passed into helper function. { success: true, payload: new user object (after replacement) }
app.patch("/api/users/:id", async (req, res) => {
  const userID = req.params.id;
  const user = req.body;
  const payload = await updateUserByID(userID, user);
  const success = payload !== null;

  if (success) {
    return res.json({ success: success, payload: payload });
  }

  res.status(404).json({ success: success, payload: null });
});

// .delete for delete user by Id { success: true, payload: deleted user }
app.delete("/api/users/:id", async (req, res) => {
  const userID = req.params.id;
  const payload = await deleteUserByID(userID);
  const success = payload !== null;

  if (success) {
    return res.json({ success: success, payload: payload });
  }

  res.status(404).json({ success: success, payload: null });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
