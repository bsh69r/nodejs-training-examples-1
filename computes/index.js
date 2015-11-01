/**
 * Created by Adron on 10/31/15.
 * Description: Pulling all the code together in examples.
 */

var primes = require('./primes');
var fibo = require('./fibonacci');


var primesTrue = 0, primesFales = 0;
var numbersToCheck = 10;
var primesMessage = 'START | ';

for (var i = 0; i < numbersToCheck + 1; i++) {
    var result = primes.isPrime(i);
    if (result) {
        primesMessage += i + " is a prime number";
        primesTrue++;
    } else {
        primesMessage += i + " is not a prime number";
        primesFales++;
    }

    if (i < numbersToCheck) {
        primesMessage += " | ";
    } else {
        primesMessage += " | DONE";
    }

}

console.log(
    "The results are: \n\n" + primesMessage + "\n\nTotal number of prime numbers in integer values 0 through " +
    numbersToCheck + " is " + primesTrue + " and " + primesFales + " are not prime numbers.");

console.log("The first " + numbersToCheck + " Fibonacci numbers are " + fibo.recursiveFibonacci(numbersToCheck));