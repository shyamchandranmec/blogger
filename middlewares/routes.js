"use strict";

module.exports = app => {
    app.use("/blogs", app.routes.blogs);
};