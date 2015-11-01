/**
 * Created by Adron on 11/1/15.
 * Description: Just basic tests for the module.
 */

var primes = require("../primes");
var should = require('chai').should();

describe('Sample module', function () {
    describe('would have message function that', function () {
        it('2 should be a prime.', function () {
            primes.isPrime(2).should.be.true;
        });
        it('4 should be a prime.', function () {
            primes.isPrime(4).should.be.false;
        });
        it('7 should be a prime.', function () {
            primes.isPrime(7).should.be.true;
        });
        it('10 should be a prime.', function () {
            primes.isPrime(10).should.be.false;
        });
    });
});
