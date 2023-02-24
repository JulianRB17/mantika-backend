const usersRoute = require("express").Router();
const {
  getUserById,
  getCurrentUser,
  getUsers,
  createUser,
  updateUser,
  // updateAvatar,
  login,
} = require("../controllers/users");

usersRoute.get("/", getUsers);
usersRoute.get("/:userId", getUserById);
usersRoute.post("/signup", createUser);
usersRoute.get("/me", getCurrentUser);
usersRoute.patch("/me", updateUser);
// usersRoute.patch("/me/avatar", updateAvatar);
usersRoute.post("/signin", login);

module.exports = { usersRoute };
