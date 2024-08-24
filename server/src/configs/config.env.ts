"use strict";

interface Config {
  [key: string]: {
    app: {
      port: string | number;
    };
    database: {
      host: string;
      port: string | number;
      name: string;
    };
  };
}

const appConfig: Config = {
  dev: {
    app: {
      port: process.env.DEV_APP_PORT || 8000,
    },
    database: {
      host: process.env.DEV_DB_HOST || "localhost",
      port: process.env.DEV_DB_PORT || 27017,
      name: process.env.DEV_DB_NAME || "e-commerce",
    },
  },
  prod: {
    app: {
      port: process.env.DEV_PROD_PORT || 8000,
    },
    database: {
      host: process.env.Prod_DB_HOST || "localhost",
      port: process.env.Prod_DB_PORT || 27017,
      name: process.env.Prod_DB_NAME || "test",
    },
  },
};

const env = process.env.NODE_ENV || "dev";
export default appConfig[env];



