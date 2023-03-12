const mongoose = require("mongoose");
const validator = require("validator");

const proyectSchema = new mongoose.Schema({
  proyectName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  proyectPic: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: (value) => `${value} is not a valid URL`,
    },
  },
  city: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  discipline: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
  colaborators: {
    type: [{ type: mongoose.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("proyect", proyectSchema);
