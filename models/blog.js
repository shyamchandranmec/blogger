/**
 * Created by shyam on 08/06/16.
 */

"use strict";

module.exports = (app) => {
    let mongoose = require("mongoose");
    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;

    let paragraphSchema = mongoose.Schema({
        content: "",
        comments: []
    });

    let blogSchema = mongoose.Schema({
        title: String,
        paragraphs: [paragraphSchema],
    }, {
        timestamps: true,
        collection: "blogs"
    });

    let BlogModel = mongoose.model("blog", blogSchema);

    BlogModel.findBlog = (id) => {
        logger.info("Finding blog with id ", id);
        return new Promise((resolve, reject) => {
            BlogModel.findById(id).then((blog) => {
                logger.info("Blog found - " + blog._id);
                return resolve(blog.toJSON());
            }).catch((err) => {
                logger.error("Unable to find blog with id " + id);
                logger.error(err);
                let errorObject = errorFormatter.createErrorObject({
                    status: 404,
                    message: "Unable to find blog",
                    details: err.message
                });
                return reject(errorObject);
            })
        })
    }

    BlogModel.getAllBlogs = (page) => {
        logger.info("Finding all blogs page ", page);
        let perPage = 5;
        return new Promise((resolve, reject) => {
            BlogModel.find({}, {"paragraphs.comments": 0}).limit(perPage).skip(perPage * page).exec().then((blogs) => {
                logger.info("Blogs found - " + blogs.length);
                return resolve(blogs);
            }).catch((err) => {
                logger.error("Unable to find blogs");
                logger.error(err);
                let errorObject = errorFormatter.createErrorObject({
                    status: 404,
                    message: "Unable to find blogs",
                    details: err.message
                });
                return reject(errorObject);
            })
        })
    };

    BlogModel.addBlog = (blogObj) => {
        return new Promise((resolve, reject) => {
            var blog = new BlogModel(blogObj);
            blog.save(blogObj).then(blog => {
                logger.info("Successfully added blog");
                return resolve(blog.toJSON());
            }).catch(err => {
                logger.error(err);
                let errorObject = errorFormatter.createErrorObject({
                    status: 404,
                    message: "Unable to add blog",
                    details: err.message
                });
                return reject(errorObject);
            });
        })
    };


    BlogModel.deleteBlog = (id) => {
        return new Promise((resolve, reject) => {
            BlogModel.findOneAndRemove({_id: id}).then((blog) => {
                logger.info(`Successfully deleted blog with id ${id}`);
                let result = {};
                if (blog) {
                    result = blog.toJSON();
                }

                return resolve(result);
            }).catch(err => {
                logger.error(`Unable to remove blog with id ${id}`);
                logger.error(err);
                let errorObject = errorFormatter.createErrorObject({
                    status: 404,
                    message: "Unable to remove blog with given id",
                    details: err.message
                });
                return reject(errorObject);
            });
        })
    };

    BlogModel.addCommentToParagraph = (blogId, paragraphId, comment) => {
        return new Promise((resolve, reject) => {
            BlogModel.findOneAndUpdate({
                _id: blogId,
                "paragraphs._id": paragraphId
            }, {
                "$push": {"paragraphs.$.comments": comment}
            }, {
                new: true
            }).then((blog) => {
                logger.info("Blog found - " + blog._id);
                return resolve(blog.toJSON());
            }).catch((err) => {
                logger.error("Unable to find blog with id " + blogId);
                logger.error(err);
                let errorObject = errorFormatter.createErrorObject({
                    status: 400,
                    message: "Unable to find blog",
                    details: err.message
                });
                return reject(errorObject);
            })
        })
    };

    return BlogModel;
};