const mongoose = require("mongoose");
const Proyect = require("../models/proyect");

const error404 = function (err) {
  err.status = 404;
  err.message = "Proyect not found";
};
const error400 = function (err) {
  err.status = 404;
  err.message = "Invalid data";
};
const error401 = function (err) {
  err.status = 401;
  err.message = "Invalid user";
};

const getProyects = async function (req, res, next) {
  try {
    const proyects = await Proyect.find({});
    res.send(proyects);
  } catch (err) {
    next(err);
  }
};

const getProyect = async function (req, res, next) {
  try {
    const id = req.params.proyectId;
    const proyect = await Proyect.findById(id);
    res.send(proyect);
  } catch (err) {
    if (err.name === "CastError") {
      error404(err);
    }
    next(err);
  }
};

const deleteProyect = async function (req, res, next) {
  try {
    const proyect = await Proyect.findById(req.params.proyectId);
    if (!proyect) throw new Error("Proyect not found");
    if (!proyect.owner.equals(req.user._id))
      throw new Error("Usuario no válido");
    else {
      const deletedProyect = await Proyect.findOneAndDelete({
        _id: req.params.proyectId,
      });
      res.send(deletedProyect);
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

const createProyect = async function (req, res, next) {
  const { proyectName, proyectPic, city, description, discipline } = req.body;
  const owner = req.user._id;
  try {
    const proyect = await Proyect.create({
      proyectName,
      proyectPic,
      city,
      description,
      discipline,
      owner,
    });
    res.send({ proyect });
  } catch (err) {
    if (err.name === "ValidationError") {
      error400(err);
    }
    next(err);
  }
};

const editProyect = async function (req, res, next) {
  const { proyectName, description, city, discipline, proyectPic } = req.body;
  const proyectId = req.params.proyectId;

  try {
    const proyect = await Proyect.findByIdAndUpdate(
      proyectId,
      {
        $set: {
          proyectName: proyectName,
          description: description,
          proyectPic: proyectPic,
          city: city,
          discipline: discipline,
        },
      },
      { new: true }
    );
    res.send(proyect);
  } catch (err) {
    if (err.name === "CastError") {
      error404(err);
    }
    if (err.message === "Proyect not found") {
      error404(err);
    }
    if (err.message === "typeError") {
      error400(err);
    }
    next(err);
  }
};

const proyectUpdateColaborators = async function (req, res, next) {
  try {
    const proyect = await Proyect.findByIdAndUpdate(
      req.params.proyectId,
      { $addToSet: { colaborators: req.user._id } },
      { new: true }
    );
    res.send(proyect);
  } catch (err) {
    if (err.name === "CastError") {
      error404(err);
    }
    next(err);
  }
};

const getMyProyects = async function (req, res, next) {
  try {
    const proyects = await Proyect.find({ owner: req.user._id });
    if (proyects) res.send(proyects);
  } catch (err) {
    if (err.name === "CastError") {
      error404(err);
    }
    next(err);
  }
};

module.exports = {
  getProyects,
  getProyect,
  deleteProyect,
  createProyect,
  editProyect,
  proyectUpdateColaborators,
  getMyProyects,
};
