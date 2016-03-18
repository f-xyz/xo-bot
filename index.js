'use strict';

var SIZE = 3;

var utils = require('./src/utils');
var ai = require('./src/ai');

(function main() {
    var turn = 0;
    //var model = [
    //    1, 1, 1,
    //    0, 0, 0,
    //    0, 0, 0
    //];
    var model = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];
    utils.dumpModel(model, SIZE);
    //dumpModel(ai.step(model, turn));
    console.log(ai.findWinner(model));
}());


