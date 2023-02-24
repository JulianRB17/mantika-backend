const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let JWT_SECRET;

if (process.env.NODE_ENV !== "production") {
  JWT_SECRET = process.env.JWT_SECRET;
} else {
  JWT_SECRET = "secreto";
}

const error400 = function (err) {
  err.message = "Se pasaron datos inválidos";
  err.status = 400;
};

const error401 = function (err, message = "No autorizado") {
  err.message = message;
  err.status = 401;
};

const error404 = function (err) {
  err.status = 404;

  err.message = "No se ha encontrado ningún usuario con ese ID";
};

const getUsers = function (req, res, next) {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => {
      next(err);
    });
};

const getUserById = async function (req, res, ext) {
  try {
    const userId = req.params.userId;
    const currentUser = await User.findById(userId);
    res.send({ currentUser });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId);
    res.send({ currentUser });
  } catch (err) {
    next(err);
  }
};

const createUser = async function (req, res, next) {
  try {
    const { username, description, profilePic, city, email, password } =
      req.body;
    console.log(req.body);
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      description,
      profilePic,
      city,
      email,
      password: hash,
    });
    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (err) {
    if (err.code === 11000) {
      error401(err, "Ya existe un usuario con este email");
    }
    if (err.name === "ValidationError") {
      error400(err);
    }
    next(err);
  }
};

const login = async function (req, res, next) {
  const { username, password } = req.body;
  const errMessage = "Email o contraseña incorrectos";
  try {
    const user = await User.findOne({ username }).select("+password");
    if (!user) throw new Error(errMessage);
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new Error(errMessage);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (err) {
    if (err.message === errMessage) {
      error401(err);
    }
    next(err);
  }
};

const updateUser = function (req, res, next) {
  const { name, description, profilePic, city } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    {
      name: name,
      description: description,
      profilePic: profilePic,
      city: city,
    },
    { new: true }
  )
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.message === "typeError") {
        error400(err);
      }
      next(err);
    });
};

// const updateAvatar = function (req, res, next) {
//   const { avatar } = req.body;
//   const userId = req.user._id;

//   User.findByIdAndUpdate(userId, { avatar: avatar }, { new: true })
//     .then((user) => {
//       res.send({ user });
//     })
//     .catch((err) => {
//       if (err.message === "TypeError") {
//         error400(err);
//       }
//       next(err);
//     });
// };

module.exports = {
  getUserById,
  getCurrentUser,
  getUsers,
  createUser,
  updateUser,
  // updateAvatar,
  login,
};