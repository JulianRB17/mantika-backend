const proyectsRoute = require("express").Router();
const { celebrate, Joi, Segments, errors } = require("celebrate");
const validator = require("validator");
const {
  getProyects,
  deleteProyect,
  createProyect,
  editProyect,
  proyectUpdateColaborators,
  getProyect,
  getMyProyects,
} = require("../controllers/proyects");

proyectsRoute.get("/", getProyects);
proyectsRoute.post("/", createProyect);
proyectsRoute.get("/created", getMyProyects);
proyectsRoute.get("/:proyectId", getProyect);
proyectsRoute.delete("/:proyectId", deleteProyect);
proyectsRoute.patch("/:proyectId", editProyect);
proyectsRoute.patch("/colaborate/:proyectId", proyectUpdateColaborators);
proyectsRoute.use(errors());

module.exports = { proyectsRoute };
