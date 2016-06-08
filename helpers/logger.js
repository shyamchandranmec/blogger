"use strict";

let winston = require("winston");

module.exports = app => {
    let logger;
    if (process.env.NODE_ENV !== "test") {
        logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({ filename: "stdout.log" })
            ]
        });
    } else {
        logger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({ filename: "stdout.log" })
            ]
        });
    }

    return logger;
};
