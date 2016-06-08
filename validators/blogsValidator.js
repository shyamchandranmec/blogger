/**
 * Created by shyam on 08/06/16.
 */

"use strict";

module.exports = app => {
    let joi = require("joi");
    let errorFormatter = app.helpers.errorFormatter;
    let schemas = app.validators.schemas.blogsSchema;
    let logger = app.helpers.logger;

    function validateAddBlog(blog) {
        logger.info(`Validating addBlog`);
        let joiValidationOption = {
            abortEarly: false,
            allowUnknown: true
        };

        return new Promise((resolve, reject) => {
            joi.validate(blog, schemas.addBlogSchema, joiValidationOption, err => {
                if (err) {
                    let error = errorFormatter.createErrorObjectFromJoiErrors(err);
                    logger.error(`Validation failed : ${JSON.stringify(error.details)}`);
                    return reject(error);
                } else {
                    logger.info("addBlog validation successful");
                    return resolve(blog);
                }
            });
        });

    }

    function validateAddCommentToParagraph(blog) {
        logger.info(`Validating addCommentToParagraph`);
        let joiValidationOption = {
            abortEarly: false,
            allowUnknown: true
        };

        return new Promise((resolve, reject) => {
            joi.validate(blog, schemas.addCommentToParagraphSchema, joiValidationOption, err => {
                if (err) {
                    let error = errorFormatter.createErrorObjectFromJoiErrors(err);
                    logger.error(`Validation failed : ${JSON.stringify(error.details)}`);
                    return reject(error);
                } else {
                    logger.info("addCommentToParagraph validation successful");
                    return resolve(blog);
                }
            });
        });

    }

    return  {
        validateAddBlog,
        validateAddCommentToParagraph
    }
};