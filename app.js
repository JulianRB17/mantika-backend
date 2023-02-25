const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, Segments, errors } = require("celebrate");
const validator = require("validator");
const cors = require("cors");

const { proyectsRoute } = require("./routes/proyects");
const { usersRoute } = require("./routes/users");
const { login, createUser } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
require("dotenv").config();

const { PORT = 3001 } = process.env;
const app = express();
app.use(cors());
app.options("*", cors());

mongoose.connect("mongodb://127.0.0.1:27017/mantika");

const urlValidator = function (value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const emailValidator = function (value, helpers) {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("The server is going to shutdown");
  }, 0);
});

app.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      profilePic: Joi.string()
        .default(
          "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg"
        )
        .custom(urlValidator),
      email: Joi.string().required().custom(emailValidator),
      username: Joi.string().required(),
      password: Joi.string().required(),
      description: Joi.string().required(),
      city: Joi.string().required(),
    }),
  }),
  createUser
);
app.post("/login", login);

app.use(auth);

app.use("/proyects", proyectsRoute);
app.use("/users", usersRoute);

app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message:
      status === 500 ? "Se ha producido un error en el servidor" : message,
  });
});

app.listen(PORT, () => {
  console.log(PORT);
});
