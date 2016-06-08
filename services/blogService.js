/**
 * Created by shyam on 08/06/16.
 */

"use strict";

module.exports = (app) => {

    let blogModel = app.models.blog;

    function getAllBlogs(page) {
        page = getActualPage(page);
        return blogModel.getAllBlogs(page);
    }

    function getActualPage(page) {
        page = parseInt(page);
        if(isNaN(page)) {
            return 0;
        }
        if(page <= 1 ) {
            page = 0
        } else {
            page -= 1;
        }
        return page;
    }

    function splitToParagraph(content) {
        let paragraphs = content.split("\n\n");
        let paraArray = [];
        for(let para of paragraphs) {
            paraArray.push({
                content: para,
                comments:[]
            })
        };
        return paraArray
    }

    function addBlog(content, title) {
        let paragraphs = splitToParagraph(content);
        let blogObj = {
            title: title,
            paragraphs:paragraphs
        };
        return blogModel.addBlog(blogObj);
    }
    
    function addCommentToParagraph(blogId, paragraphId, comment) {
        return blogModel.addCommentToParagraph(blogId, paragraphId, comment);
    }

    function findBlog(id) {
        return blogModel.findBlog(id);
    }

    return {
        getAllBlogs,
        addBlog,
        findBlog,
        addCommentToParagraph
    }
};