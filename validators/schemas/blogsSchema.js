/**
 * Created by shyam on 08/06/16.
 */

"use strict";

module.exports = app => {
    let joi = require("joi");

    let addBlogSchema = joi.object().keys({
        title: joi.string().required(),
        content: joi.string().required()
    });

    let addCommentToParagraphSchema = joi.object().keys({
        comment: joi.string().required()
    });
    
    return {
        addBlogSchema,
        addCommentToParagraphSchema
    };
};

