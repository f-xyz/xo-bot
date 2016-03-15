var chai = require('chai');
chai.should();

describe('Utils', function () {
    var utils = require('../src/utils');
    var model = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];
    it('row(model, nRow)', function () {
        // act
        var res = utils.row(model, 1, 3);
        // assert
        res.should.eql([3, 4, 5]);
    });
    it('col(model, nCol)', function () {
        // act
        var res = utils.col(model, 1, 3);
        // assert
        res.should.eql([1, 4, 7]);
    });
});

describe('Ai', function () {
    it('isWin()', function () {
        // arrange
        // act
        // assert
    });
});