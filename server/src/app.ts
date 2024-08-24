require("dotenv").config();

import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import instanceMongoDB from "./database/init.mongodb";
import {
  countConectionDB,
  overloadConectionDB,
} from "./helpers/check.connectionDB";

//init middlewares
const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//init Database
instanceMongoDB.connect();
overloadConectionDB();
countConectionDB();

//init routes
app.get("/", (req, res, next) => {
  res.send("Hello World");
});

export default app;
