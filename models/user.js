const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  discipline: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: (value) => `${value} is not a valide email`,
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 150,
  },
  profilePic: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: (value) => `${value} is not a valid URL`,
    },
  },
  city: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  createdProyects: { type: [{ type: mongoose.ObjectId }], default: [] },
  colaboratingInProyects: { type: [{ type: mongoose.ObjectId }], default: [] },
});

module.exports = mongoose.model("user", userSchema);
