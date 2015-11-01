/**
 * Created by Adron on 10/31/15.
 */

var fibonacciCalculations = {};

fibonacciCalculations.fibonacci = function (n) {
    if (n <= 1)
        return n;
    else
        return gimmeFibonacci(n - 1) + gimmeFibonacci(n - 2);
};

function gimmeFibonacci(n) {
    var fibo = [0, 1];

    if (n <= 2) return 1;

    for (var i = 2; i <= n; i++) {
        fibo[i] = fibo[i - 1] + fibo[i - 2];
    }

    return fibo[n];
}

fibonacciCalculations.recursiveFibonacci = function (numMax) {
    var resultMessage = '';

    for (i = 0, j = 1, k = 0; k < numMax; i = j, j = x, k++) {
        x = i + j;
        resultMessage += x;
        if (k < numMax - 1) {
            resultMessage += ", "
        }
    }

    return resultMessage;
};

module.exports = fibonacciCalculations;