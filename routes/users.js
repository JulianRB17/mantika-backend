const usersRoute = require("express").Router();
const {
  getUserById,
  getCurrentUser,
  getUsers,
  updateUser,
  deleteUser,
  // updateAvatar,
  login,
} = require("../controllers/users");

usersRoute.get("/", getUsers);
usersRoute.get("/:userId", getUserById);
// usersRoute.post("/signup", createUser);
usersRoute.get("/me", getCurrentUser);
usersRoute.patch("/me", updateUser);
// usersRoute.patch("/me/avatar", updateAvatar);
usersRoute.delete("/:id", deleteUser);
module.exports = { usersRoute };
