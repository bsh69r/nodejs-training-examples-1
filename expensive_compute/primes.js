/**
 * Created by Adron on 10/31/15.
 * Description: Some basic prime number check and prime factors.
 * Reminder: A prime number (or a prime) is a natural number greater
 * than 1 that has no positive divisors other than 1 and itself. A
 * natural number greater than 1 that is not a prime number is called
 * a composite number.
 */

var primeCheck = {};

primeCheck.isPrime = function (n) {
    var divisor = 2;

    while (n > divisor) {
        if (n % divisor == 0) {
            return false;
        }
        else
            divisor++;
    }
    return true;
};

module.exports = primeCheck;