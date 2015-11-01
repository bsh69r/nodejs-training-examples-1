/**
 * Created by Adron on 11/1/15.
 * Description: Just basic tests for the module.
 */

var modz = require("../index");
var should = require('chai').should();

describe('Sample module', function () {
    describe('would have message function that', function () {

        var result = modz.showMessage();

        it('should be a string.', function () {
            result.should.be.a('string');
        });
        it('should have a specific message.', function () {
            result.should.equal("This is a hello from the NPM package!");
        })
    });

    describe('would have a nested object that', function () {
        var nestedOjbect = modz.nestedObject;

        it('should exist', function () {
            nestedOjbect.should.exist;
        });

        describe('would have a function that adds', function () {
            it('should add two numbers', function () {
                nestedOjbect.addThese(2, 2).should.equal(4);
            })
        })
    })
});
