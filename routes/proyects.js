const proyectsRoute = require("express").Router();
const { celebrate, Joi, Segments, errors } = require("celebrate");
const validator = require("validator");
const {
  getProyects,
  deleteProyect,
  createProyect,
} = require("../controllers/proyects");

const urlValidator = function (value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

proyectsRoute.get("/", getProyects);
proyectsRoute.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      proyectPic: Joi.string().required().custom(urlValidator),
      proyectName: Joi.string().required(),
      city: Joi.string().required(),
      proyectDescription: Joi.string().required(),
      discipline: Joi.string().required(),
    }),
  }),
  createProyect
);
proyectsRoute.delete("/:proyectId", deleteProyect);
// proyectsRoute.put("/likes/:proyectId", likeproyect);
// proyectsRoute.delete("/likes/:proyectId", unlikeproyect);
proyectsRoute.use(errors());

module.exports = { proyectsRoute };
