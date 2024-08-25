require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";

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
app.use(express.json({ limit: "50mb" }));

//cokie parser
app.use(cookieParser());

//Cors => cors origin recourse sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//init Database
instanceMongoDB.connect();
overloadConectionDB();
countConectionDB();

//test api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true, //success
    message: "API is working",
  });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`) as any;
  err.statusCode = 404;
  next(err);
});

export default app;
