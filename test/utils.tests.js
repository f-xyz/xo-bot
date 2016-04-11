var _ = require('lodash');
var utils = require('../src/utils');

var size = 3;
var seqLength = 3;
var model = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
];

describe('Utils', function () {

    describe('areAllItemsEqualTo()', function () {
        it('return true if all model`s items equal to argument', function () {
            // arrange
            var model = [
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ];
            // act
            var res = utils.areAllItemsEqualTo(model, 0);
            // assert
            res.should.eq(true);
        });
        it('returns false otherwise', function () {
            // arrange
            var model = [
                0, 0, 0,
                0, 1, 0,
                0, 0, 0
            ];
            // act
            var res = utils.areAllItemsEqualTo(model, 0);
            // assert
            res.should.eq(false);
        });
    });

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

    describe('Slices', function () {
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

    describe('findPossibleTurns()', function () {
        it('returns [x, y] coords of free cells', function () {
            // arrange
            var model = [
                1, 1, 1,
                1, 0, 0,
                1, 1, 1
            ];
            // act
            var res = utils.findPossibleTurns(model, size);
            // assert
            res.should.eql([
                { x: 1, y: 1, i: 4 },
                { x: 2, y: 1, i: 5 }
            ]);
        });
    });

    //////////////////////////////////////////////////////////

    describe('countNeighbourhoodsByIndex()', function () {
        it('get coords', function () {
            // arrange
            var model = [
                1, 1, 1,
                1, 0, 0,
                1, 1, 1
            ];
            // act
            // assert
        });
    });

});
