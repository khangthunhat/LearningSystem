"use strict";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import config from "../configs/config.env";

const dbHost = config.database.host;
const dbPort = config.database.port;
const dbName = config.database.name;

const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;

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