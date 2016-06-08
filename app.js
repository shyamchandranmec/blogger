"use strict";
let express = require("express");
let consign = require("consign");
let app = express();

consign()
    .include("./helpers")
    .then("./models/connection.js")
    .then("./models/")
    .then("./middlewares/basicSettings.js")
    .then("./middlewares/staticResources.js")
    .then("./validators/schemas")
    .then("./validators/")
    .then("./services/")
    .then("./controllers/")
    .then("./routes")
    .then("./middlewares/routes.js")
    .then("./middlewares/errorHandler.js")
    .then("./middlewares/server.js")
    .into(app);

module.exports = app;