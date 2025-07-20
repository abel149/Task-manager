/* eslint-disable import/extensions */

const express = require("express");
const morgan = require("morgan");
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require("cors");
//const AppError = require('./utils/apperror');
//const globalErrorHandler = require('./controlers/errorcontroler');
const path = require("path");

const authRoutes = require("./routes/auth");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors({ origin: "http://192.168.114.165:5000" }));

app.use(express.json());

app.use("/api/auth", authRoutes);

//app.use('/api/v1/tours' /*userrouter*/);

//app.use(globalErrorHandler);

module.exports = app;
