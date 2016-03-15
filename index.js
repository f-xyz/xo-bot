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
    dumpModel(model);
    //dumpModel(ai.step(model, turn));
    console.log(ai.findWinner(model));
}());

function dumpModel(model) {
    var cols = 3;
    for (var i = 0; i < cols; i++) {
        console.log(model.slice(cols*i, cols*(i+1)));
    }
}

//describe('isWin() tests', function () {
//    it('determines win', function () {
//        // arrange
//        var model = [
//            1, 0, 0,
//            0, 1, 0,
//            0, 0, 1
//        ];
//        // act
//        var res = isWin(model);
//        // assert
//        expect(res).toBe(true);
//    });
//});