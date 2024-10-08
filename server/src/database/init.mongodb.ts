"use strict";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import config from "../configs/config.env";

const dbHost = config.database.host;
const dbPort = config.database.port;
const dbName = config.database.name;

const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;
/* The backtick character (`) is used to create template literals in JavaScript and TypeScript.
Template literals allow for easier string interpolation and multiline strings. In the provided code
snippet, the backticks are used to create the `dbUrl` string by interpolating variables `dbHost`,
`dbPort`, and `dbName` within the string. This allows for a more concise and readable way to
construct strings with dynamic values. */
class DataBase {
  private static instance: DataBase;
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    if (1 == 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(dbUrl, {
        maxPoolSize: 100,
      })
      .then((_) => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
      });
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new DataBase();
    }
    return this.instance;
  }
}

const instanceMongoDB = DataBase.getInstance();
export default instanceMongoDB;