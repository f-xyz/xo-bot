var _ = require('lodash');
var utils = require('../src/utils');
var ai = require('../src/ai');

var size = 3;
var seqLength = 3;

describe('Ai', function () {
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

    describe('findTreeOfPossibleTurns()', function () {

        // returns tree of possible turns
        // calculates N turns forward
        // changes player in each subtree

        it('returns tree of possible turns', function () {

            // arrange
            var model = [
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ];

            // act
            console.time('[timer] findTreeOfPossibleTurns');
            var turnTree = ai.findTreeOfPossibleTurns({
                model: model,
                size: 3,
                seqLength: 3,
                player: 2,
                nTurnsForward: 1
            });
            console.timeEnd('[timer] findTreeOfPossibleTurns');

            var turnList = ai.findBestTurn(turnTree);
            console.log(turnList);

            // assert
            //console.log(JSON.stringify(res));
        });
    });

    describe('makeTurn()', function () {
        xit('???', function () {
            // arrange
            var model = [
                0, 0, 0,
                0, 0, 0,
                0, 0, 0
            ];
            // act
            utils.dumpModel(model, size);
            //
            for (var i = 0; i < 9; i++) {

                console.log(new Array(41).join('=') + ' ' + i);

                model = ai.makeTurn({ model: model, size: size, seqLength: seqLength, player: 1 });

                console.log(new Array(41).join('-'));

                utils.dumpModel(model, size);

                if (ai.findWinner(model, size, seqLength)) {
                    break;
                }
            }
            // assert
            //res.should.eq(0);
        });
    });

});