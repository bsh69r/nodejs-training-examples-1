/**
 * Created by Adron on 11/1/15.
 * Description: A basic command line tool.
 */

var modObject = {};

modObject.showMessage = function () {
    return "This is a hello from the NPM package!";
};

modObject.nestedObject = {
    anotherMessage: "A hello from inside the nested object."
};

modObject.nestedObject.addThese = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
};

module.exports = modObject;