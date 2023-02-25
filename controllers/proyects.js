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

const getProyects = function (req, res, next) {
  Proyect.find({})
    .then((proyects) => res.send({ proyects }))
    .catch((err) => {
      next(err);
    });
};

const deleteProyect = function (req, res, next) {
  Proyect.findById(req.params.proyectId)
    .then((proyect) => {
      if (!proyect) throw new Error("Proyect not found");
      if (!proyect.owner.equals(req.user._id))
        throw new Error("Usuario no válido");
      else {
        return proyect;
      }
    })
    .then((proyect) => Proyect.findOneAndRemove(proyect))
    .then((proyect) => res.send({ proyect }))
    .catch((err) => {
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
    });
};

const createProyect = function (req, res, next) {
  const { proyectName, proyectPic, city, proyectDescription, discipline } =
    req.body;
  const owner = req.user._id;
  Proyect.create({
    proyectName,
    proyectPic,
    city,
    proyectDescription,
    discipline,
    owner,
  })
    .then((proyect) => {
      res.send({ proyect });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        error400(err);
      }
      next(err);
    });
};

// const editProyect = function (req, res, next) {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true }
//   )
//     .then((card) => res.send({ card }))
//     .catch((err) => {
//       if (err.name === "CastError") {
//         error404(err);
//       }
//       next(err);
//     });
// };

module.exports = { getProyects, deleteProyect, createProyect };
