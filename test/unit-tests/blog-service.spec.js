/**
 * Created by shyam on 12/06/16.
 */

"use strict";

let blogService = app.services.blogService;

describe("Running unit test for blog service", function () {
    describe("Testing getActualPage", function () {
        it("Should return 0 when null is passed", function () {
            let result = blogService.getActualPage(null);
            expect(result).to.equal(0);
        });
        it("Should return 0 when undefined is passed", function () {
            let result = blogService.getActualPage(undefined);
            expect(result).to.equal(0);
        });
        it("Should return 0 when string-aplpanumeric is passed", function () {
            let result = blogService.getActualPage("123asdf");
            expect(result).to.equal(0);
        });
        it("Should return 0 when zero is passed", function () {
            let result = blogService.getActualPage(0);
            expect(result).to.equal(0);
        });
        it("Should return 0 when one is passed", function () {
            let result = blogService.getActualPage(1);
            expect(result).to.equal(0);
        });
        it("Should return 0 when negative number  is passed", function () {
            let result = blogService.getActualPage(-21);
            expect(result).to.equal(0);
        });
        it("Should return input-1 when any number > 1  is passed", function () {
            let num = 22;
            let result = blogService.getActualPage(num);
            expect(result).to.equal(num - 1);
        });
        it("Should return input-1 when any number > 1  is passed in string format", function () {
            let num = "22";
            let result = blogService.getActualPage(num);
            expect(result).to.equal(parseInt(num) - 1);
        })

    });

    describe("Testing splitToParagraph", function () {
        it("Should return an array of length zero when null is passed", function () {
            let result = blogService.splitToParagraph(null);
            expect(result.length).to.equal(0);
        });
        it("Should return an array of length zero when undefined is passed", function () {
            let result = blogService.splitToParagraph(undefined);
            expect(result.length).to.equal(0);
        });
        it("Should return an array if input in number", function() {
            let result = blogService.splitToParagraph(123);
            expect(result.length).to.equal(1);
        });
        it("Should return an array of length one if input in string without return char", function() {
            let result = blogService.splitToParagraph("random");
            expect(result.length).to.equal(1);
        });
        it("Should return an array of length 2 if input has two return chars", function() {
            let result = blogService.splitToParagraph("random\n\nstring");
            expect(result.length).to.equal(2);
        })
    })
});