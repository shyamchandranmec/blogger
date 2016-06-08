/**
 * Created by shyam on 08/06/16.
 */

"use strict";


module.exports = (app) => {

    let blogService = app.services.blogService;
    let validator = app.validators.blogsValidator;

    function getAllBlogs (req, res, next) {
        var page = req.param("page");
        return blogService.getAllBlogs(page).then((blogs) => {
            res.json(blogs);
        }).catch((err) => {
            next(err);
        })
    }

    function addBlog (req, res, next) {
        return validator.validateAddBlog(req.body).then(() => {
            return blogService.addBlog(req.body.content, req.body.title);
        }).then((blog) => {
            res.json(blog);
        }).catch((err) => {
            next(err);
        })
    }

    function findBlog (req, res, next) {
        return blogService.findBlog(req.params.id).then((blog) => {
            res.json(blog);
        }).catch((err) => {
            next(err);
        })
    }

    function addCommentToParagraph (req, res, next) {
        return validator.validateAddCommentToParagraph(req.body).then(() => {
            return blogService.addCommentToParagraph(req.params.id, req.params.paraId, req.body.comment)
        }).then((blog) => {
            res.json(blog);
        }).catch((err) => {
            next(err);
        })
    }

    return {
        getAllBlogs,
        addBlog,
        findBlog,
        addCommentToParagraph
    }
}