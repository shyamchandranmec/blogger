/**
 * Created by shyam on 11/06/16.
 */

"use strict";
let _ = require("underscore");

describe("Test cases for all blogs apis", function () {

    let id = null;
    let paraId = null;

    describe("Create a new blog post", function () {
        it("Should create a new blog post", function (done) {
            let blog = {
                title: "My new blog",
                content: "My new blog content"
            };
            request.post("/blogs").send(blog)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.exist;
                    expect(res.body._id).to.exist;
                    expect(res.body.title).to.equal(blog.title);
                    expect(res.body.paragraphs).to.exist;
                    expect(res.body.paragraphs.length).to.equal(1);
                    expect(res.body.paragraphs[0].comments).to.exist;
                    expect(res.body.paragraphs[0].comments.length).to.equal(0);
                    expect(res.body.paragraphs[0].content).to.exist;
                    id = res.body._id;
                    paraId = res.body.paragraphs[0]._id;
                    done();
                })
        });

        it("Should fail to create a new blog post [Required parameters missing]", function (done) {
            let blog = {};
            request.post("/blogs").send(blog)
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(400);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.be.true;
                    done();
                })
        });
    })

    describe("Fetch a blog post", function () {
        it("Should not fetch a blog post [Random blog id]", function (done) {
            request.get(`/blogs/asdfas`).send()
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(404);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.be.true;
                    done();
                })
        });

        it("Should fetch a blog post", function (done) {
            request.get(`/blogs/${id}`).send()
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.exist;
                    expect(res.body._id).to.exist;
                    expect(res.body._id).to.equal(id);
                    done();
                })
        })
    });

    describe("Add comment to paragraph", function () {
        it("Should add a comment", function (done) {
            let obj = {
                comment: "This is my new comment"
            };
            request.post(`/blogs/${id}/paragraphs/${paraId}/comments`).send(obj)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.exist;
                    expect(res.body._id).to.exist;
                    expect(res.body.paragraphs).to.exist;
                    let para = _.find(res.body.paragraphs, function (para) {
                        return para._id == paraId
                    });
                    expect(para.comments).to.contain(obj.comment);
                    done();
                })
        })

        it("Should fail add a comment [ Random blog id and paragraph id]", function (done) {
            let obj = {
                comment: "This is my new comment"
            };

            request.post(`/blogs/random/paragraphs/random/comments`).send(obj)
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(400);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.be.true;
                    done();
                })
        });

        it("Should fail add a comment [ Required parameters missing]", function (done) {
            let obj = {};

            request.post(`/blogs/${id}/paragraphs/${paraId}/comments`).send(obj)
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(400);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.be.true;
                    done();
                })
        })


    });

    describe("Delete blog", function () {
        it("Should delete existing blog", function (done) {
            request.delete(`/blogs/${id}`).send()
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.exist;
                    expect(res.body._id).to.exist;
                    expect(res.body._id).to.equal(id);
                    done();
                })
        });
    })


});