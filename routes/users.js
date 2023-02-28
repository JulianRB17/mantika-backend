const usersRoute = require("express").Router();
const {
  getUserById,
  getCurrentUser,
  getUsers,
  updateUser,
  deleteUser,
  userUpdateColaborateIn,
  userUpdateCreateProyect,
} = require("../controllers/users");

usersRoute.get("/", getUsers);
usersRoute.get("/me", getCurrentUser);
usersRoute.get("/:userId", getUserById);
usersRoute.patch("/me", updateUser);
usersRoute.patch("/colaborate/:proyectId", userUpdateColaborateIn);
usersRoute.patch("/create/:proyectId", userUpdateCreateProyect);
usersRoute.delete("/:id", deleteUser);
module.exports = { usersRoute };
