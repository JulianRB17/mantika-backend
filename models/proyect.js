const mongoose = require("mongoose");

const proyectSchema = new mongoose.Schema({
  proyectName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  proyectPic: {},
  city: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  proyectDescription: {
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
  Colaborators: {
    type: [{ type: mongoose.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("proyect", proyectSchema);
