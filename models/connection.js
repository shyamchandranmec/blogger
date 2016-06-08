"use strict";

let mongoose = require("mongoose");


module.exports = app => {
    let logger = app.helpers.logger;
    let dbURI =  "mongodb://localhost/blogger";
    mongoose.Promise = Promise;
    
    function onConnectionError (err) {
        logger.log("error", `Mongoose  connection error: ${err}`);
        logger.log("error", dbURI);
    }

    function onConnect () {
        logger.info(`Mongoose connection open to ${dbURI}`);
    }

    function onDisconnect () {
        logger.log("warn", "Mongoose connection disconnected");
    }

    function registerEvents () {
        mongoose.connection.on("connected", onConnect);

        /**
         *   If the connection throws an error
          */
        mongoose.connection.on("error", onConnectionError);

        /**
         * When the connection is disconnected
         */
        mongoose.connection.on("disconnected", onDisconnect);

        /**
         * If the Node process ends, close the Mongoose connection
          */
        process.on("SIGINT", function () {
            mongoose.connection.close(() => {
                logger.log("warn", "Mongoose connection disconnected through app termination");
                process.exit(0);
            });
        });
    }

    function connect () {
        registerEvents();
        mongoose.connect(dbURI);
    }
    connect();
};
