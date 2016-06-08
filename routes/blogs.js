/**
 * Created by shyam on 08/06/16.
 */

"use strict";

var express = require('express');
var router = express.Router();

module.exports = app => {
    let blogsController = app.controllers.blogsController;

    router.route('/')
        .get((req, res, next) => blogsController.getAllBlogs(req, res, next))
        .post((req, res, next) => blogsController.addBlog(req, res, next));

    router.route('/:id')
        .get((req, res, next) => blogsController.findBlog(req, res, next));

    router.route("/:id/paragraphs/:paraId/comments")
        .post((req, res, next) => blogsController.addCommentToParagraph(req, res, next));
    return router;
};

