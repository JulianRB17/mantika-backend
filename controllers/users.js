const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let JWT_SECRET;

if (process.env.NODE_ENV !== "production") {
  JWT_SECRET = process.env.JWT_SECRET;
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

const getUsers = async function (req, res, next) {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (err) {
    next(err);
  }
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
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      description,
      profilePic,
      city,
      email,
      password: hash,
    });
    console.log(JWT_SECRET);
    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (err) {
    if (err.code === 401) {
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

const updateUser = async function (req, res, next) {
  const { username, description, profilePic, city, discipline } = req.body;
  const userId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        username: username,
        description: description,
        profilePic: profilePic,
        city: city,
        discipline: discipline,
      },
      { new: true }
    );
    res.send({ user });
  } catch (err) {
    if (err.message === "typeError") {
      error400(err);
    }
    next(err);
  }
};

const deleteUser = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("User not found");
    if (!user._id.equals(req.user._id)) throw new Error("Usuario no válido");
    else {
      User.findOneAndRemove(user);
      res.send({ user });
    }
  } catch (err) {
    if (err.name === "CastError") {
      error404(err);
    }
    if (err.message === "Proyect not found") {
      error404(err);
    }
    if (err.message === "Invalid user") {
      error401(err);
    }
    next(err);
  }
};

const userUpdateColaborateIn = async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { colaboratingInProyects: req.params.proyectId } },
      { new: true }
    );
    res.send({ user });
  } catch (err) {
    if (err.name === "CastError") {
      error404(err);
    }
    next(err);
  }
};

const userUpdateCreateProyect = async function (req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { createdProyects: req.params.proyectId } },
      { new: true }
    );
    res.send({ user });
  } catch (err) {
    if (err.name === "CastError") {
      error404(err);
    }
    next(err);
  }
};

module.exports = {
  getUserById,
  getCurrentUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  userUpdateColaborateIn,
  userUpdateCreateProyect,
};
