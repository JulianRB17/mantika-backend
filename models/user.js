const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 150,
  },
  profilePic: {},
  discipline: { type: String, minlength: 2, maxlength: 30 },
  city: {
    type: String,
    minlength: 2,
    maxlength: 30,
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
  createdProyects: { type: [{ type: mongoose.ObjectId }], default: [] },
  colaboratingInProyects: { type: [{ type: mongoose.ObjectId }], default: [] },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
