var _ = require('lodash');
var chai = require('chai');
chai.should();

var size = 3;
var seqLength = 3;

describe('Utils', function () {
    var utils = require('../src/utils');
    var model = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ];
    describe('compareArrays(a, b)', function () {
        it('returns true if models are identical', function () {
            // arrange
            var modelClone = _.cloneDeep(model);
            // act
            var res = utils.compareArrays(model, modelClone);
            // assert
            res.should.eq(true);
        });
        it('returns false otherwise', function () {
            // arrange
            var modelClone = _.cloneDeep(model);
            modelClone[size-1] = NaN;
            // act
            var res = utils.compareArrays(model, modelClone);
            // assert
            res.should.eq(false);
        });
    });
    it('sliceRow(model, nRow)', function () {
        // act
        var res = utils.sliceRow(model, 1, size);
        // assert
        res.should.eql([3, 4, 5]);
    });
    it('sliceColumn(model, nCol)', function () {
        // act
        var res = utils.sliceColumn(model, 1, size);
        // assert
        res.should.eql([1, 4, 7]);
    });
    it('sliceLeftTopToRightBottomDiagonal()', function () {
        // act
        var res = utils.sliceLeftTopToRightBottomDiagonal(model, size);
        // assert
        res.should.eql([0, 4, 8]);
    });
    it('sliceRightTopToLeftBottomDiagonal()', function () {
        // act
        var res = utils.sliceRightTopToLeftBottomDiagonal(model, size);
        // assert
        res.should.eql([2, 4, 6]);
    });
});

describe('Ai', function () {
    var ai = require('../src/ai');
    describe('findWinnerByRow()', function () {
        it('returns 1 if winner is X', function () {
            // arrange
            var model = [
                0, 0, 0,
                1, 1, 1,
                0, 0, 0
            ];
            // act
            var res = ai.findWinnerByRow(model, 1, size, seqLength);
            // assert
            res.should.eq(1);
        });
        it('returns 0 if winner is O', function () {
            // arrange
            var model = [
                0, 0, 0,
                2, 2, 2,
                0, 0, 0
            ];
            // act
            var res = ai.findWinnerByRow(model, 1, size, seqLength);
            // assert
            res.should.eq(2);
        });
        it('returns 0 if no winner', function () {
            // arrange
            var model = [
                0, 0, 0,
                1, 0, 1,
                0, 0, 0
            ];
            // act
            var res = ai.findWinnerByRow(model, 1, size, seqLength);
            // assert
            res.should.eq(0);
        });
        it('if seqLength < size', function () {
            // arrange
            var model = [
                0, 0, 0,
                0, 1, 1,
                0, 0, 0
            ];
            // act
            var res = ai.findWinnerByRow(model, 1, size, 2);
            // assert
            res.should.eq(1);
        });
    });
    describe('findWinnersByCol()', function () {
        it('returns 1 if winner is X', function () {
            // arrange
            var model = [
                0, 1, 0,
                0, 1, 0,
                0, 1, 0
            ];
            // act
            var res = ai.findWinnerByCol(model, 1, size, seqLength);
            // assert
            res.should.eq(1);
        });
        it('returns 0 if winner is O', function () {
            // arrange
            var model = [
                0, 2, 0,
                0, 2, 0,
                0, 2, 0
            ];
            // act
            var res = ai.findWinnerByCol(model, 1, size, seqLength);
            // assert
            res.should.eq(2);
        });
        it('returns 0 if no winner', function () {
            // arrange
            var model = [
                0, 2, 0,
                0, 0, 0,
                0, 2, 0
            ];
            // act
            var res = ai.findWinnerByCol(model, 1, size, seqLength);
            // assert
            res.should.eq(0);
        });
        it('if seqLength < size', function () {
            // arrange
            var model = [
                0, 0, 0,
                0, 1, 0,
                0, 1, 0
            ];
            // act
            var res = ai.findWinnerByCol(model, 1, size, 2);
            // assert
            res.should.eq(1);
        });
    });
    describe('checkWinnersByDiagonal()', function () {
        describe('left top to right bottom diagonal', function () {
            it('returns 1 if winner is X', function () {
                // arrange
                var model = [
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1
                ];
                // act
                var res = ai.findWinnerByDiagonal(model, true, size, seqLength);
                // assert
                res.should.eq(1);
            });
            it('returns 2 if winner is O', function () {
                // arrange
                var model = [
                    2, 0, 0,
                    0, 2, 0,
                    0, 0, 2
                ];
                // act
                var res = ai.findWinnerByDiagonal(model, true, size, seqLength);
                // assert
                res.should.eq(2);
            });
            it('returns 0 if no winner', function () {
                // arrange
                var model = [
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0
                ];
                // act
                var res = ai.findWinnerByDiagonal(model, true, size, seqLength);
                // assert
                res.should.eq(0);
            });
        });
        describe('right top to left bottom diagonal', function () {
            it('returns 1 if winner is X', function () {
                // arrange
                var model = [
                    0, 0, 1,
                    0, 1, 0,
                    1, 0, 0
                ];
                // act
                var res = ai.findWinnerByDiagonal(model, false, size, seqLength);
                // assert
                res.should.eq(1);
            });
            it('returns 2 if winner is O', function () {
                // arrange
                var model = [
                    0, 0, 2,
                    0, 2, 0,
                    2, 0, 0
                ];
                // act
                var res = ai.findWinnerByDiagonal(model, false, size, seqLength);
                // assert
                res.should.eq(2);
            });
            it('returns 0 if no winner', function () {
                // arrange
                var model = [
                    0, 0, 1,
                    0, 0, 0,
                    1, 0, 0
                ];
                // act
                var res = ai.findWinnerByDiagonal(model, false, size, seqLength);
                // assert
                res.should.eq(0);
            });
        });
    });
    describe('findWinner()', function () {
        it('returns 0 if no winner', function () {
            // arrange
            var model = [
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ];
            // act
            var res = ai.findWinner(model, size, seqLength);
            // assert
            res.should.eq(0);
        });
        it('returns 1 if winner is X', function () {
            // arrange
            var model = [
                0, 0, 1,
                0, 1, 0,
                1, 0, 0
            ];
            // act
            var res = ai.findWinner(model, size, seqLength);
            // assert
            res.should.eq(1);
        });
        it('returns 2 if winner is O', function () {
            // arrange
            var model = [
                2, 0, 0,
                0, 2, 0,
                0, 0, 2
            ];
            // act
            var res = ai.findWinner(model, size, seqLength);
            // assert
            res.should.eq(2);
        });
    });
});