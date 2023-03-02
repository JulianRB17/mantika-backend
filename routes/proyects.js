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
} = require("../controllers/proyects");

const urlValidator = function (value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

proyectsRoute.get("/", getProyects);
proyectsRoute.get("/:proyectId", getProyect);
proyectsRoute.post(
  "/",
  // celebrate({
  //   [Segments.BODY]: Joi.object().keys({
  //     img: Joi.string().custom(urlValidator),
  //     name: Joi.string().required(),
  //     city: Joi.string().required(),
  //     description: Joi.string().required(),
  //     discipline: Joi.string().required(),
  //   }),
  // }),
  createProyect
);
proyectsRoute.delete("/:proyectId", deleteProyect);
proyectsRoute.patch("/:proyectId", editProyect);
proyectsRoute.patch("/colaborate/:proyectId", proyectUpdateColaborators);
// proyectsRoute.delete("/likes/:proyectId", unlikeproyect);
proyectsRoute.use(errors());

module.exports = { proyectsRoute };
