"use strict";

import mongoose from 'mongoose';
import os from 'os';
import process from 'process';

const _SECONDS = 5000;

//CHECK COUNT CONNECTION DB
const countConectionDB = async () => {
    const numOfConections = mongoose.connections.length;
    console.log(`Number of connections: ${numOfConections}`);
}

//CHECK OVERLOAD CONNECTION DB
const overloadConectionDB = async () => {
    setInterval(() => {
        const numOfConections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //example maximum of connections base on numCores
        const maxConnect = numCores * 5;
        console.log(
            "memoryUsage: " +
              memoryUsage / 1024 / 1024 +
              " MB, Number of connect: " +
              numOfConections
          );
        if (numOfConections > maxConnect) {
            console.log("OVERLOAD CONNECTION DB");
        }
    }, _SECONDS);
}

export { countConectionDB, overloadConectionDB };

