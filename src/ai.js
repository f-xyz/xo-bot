var _ = require('lodash');
var utils = require('./utils');

var ai = {

    findWinnerByRow: function (model, nRow, size, seqLength) {
        var slice = utils.sliceRow(model, nRow, size);
        return this._findWinnerBySlice(slice, size, seqLength);
    },

    findWinnerByCol: function (model, nCol, size, seqLength) {
        var slice = utils.sliceColumn(model, nCol, size);
        return this._findWinnerBySlice(slice, size, seqLength);
    },

    findWinnerByDiagonal: function (model, isLeftTopToRightDown, size, seqLength) {
        var slice =
            isLeftTopToRightDown ?
                utils.sliceLeftTopToRightBottomDiagonal(model, size) :
                utils.sliceRightTopToLeftBottomDiagonal(model, size)
        ;
        return this._findWinnerBySlice(slice, size, seqLength);
    },

    _findWinnerBySlice: function (slice, size, seqLength) {
        var xScore = 0;
        var oScore = 0;

        for (var i = 0; i < size; i++) {
            var cell = slice[i];

            if (cell == 1) xScore++;
            else xScore = 0;

            if (cell == 2) oScore++;
            else oScore = 0;

            if (xScore >= seqLength) return 1;
            if (oScore >= seqLength) return 2;
        }

        return 0;
    },

    findWinner(model, size, seqLength) {
        var winner = 0;

        for (var i = 0; i < size; i++) {
            var winnerByRow = this.findWinnerByRow(model, i, size, seqLength);
            if (winnerByRow) {
                return winnerByRow;
            }
            var winnerByCol = this.findWinnerByCol(model, i, size, seqLength);
            if (winnerByCol) {
                return winnerByCol;
            }
        }

        var winnerByLtToRbDiagonal = this.findWinnerByDiagonal(model, true, size, seqLength);
        if (winnerByLtToRbDiagonal) {
            return winnerByLtToRbDiagonal;
        }

        var winnerByRtToLbDiagonal = this.findWinnerByDiagonal(model, false, size, seqLength);
        if (winnerByRtToLbDiagonal) {
            return winnerByRtToLbDiagonal;
        }

        return winner;
    },

    ///////////////////////////////////////////////////////////////////////////

    findTreeOfPossibleTurns: function (parameters) {
        var model = parameters.model;
        var size = parameters.size;
        var seqLength = parameters.seqLength;
        var player = parameters.player;
        var nTurnsForward = parameters.nTurnsForward;
        var level = parameters.level || 0;

        console.log('');

        var padding = new Array(level*4 + 1).join(' ');
        console.log(padding + 'turn ' + level + ' by ' + player + new Array(10).join('-'));

        utils.dumpModel(model, size, level*4);

        var trees = [];
        var possibleTurns = utils.findPossibleTurns(model, size);

        //console.log(possibleTurns);

        var winner = this.findWinner(model, size, seqLength);

        for (var i = 0; i < possibleTurns.length; i++) {
            winner = this.findWinner(model, size, seqLength);
            //console.log(_.padStart('winner: ', 8+level*4, ' ') + winner);
            //console.log('#' + i);

            //console.log(new Array(level*4+1).join(' ') + winner);

            if (winner > 0) {
                break;
            }

            var turn = possibleTurns[i];
            var newModel = _.clone(model);
            var newPLayer = 3 - player; // hack

            newModel[turn.i] = player;

            if (level < nTurnsForward) {
                trees.push({
                    turn: turn,
                    model: newModel,
                    next: this.findTreeOfPossibleTurns({
                        model: newModel,
                        size: size,
                        seqLength: seqLength,
                        player: newPLayer,
                        nTurnsForward: nTurnsForward,
                        level: level + 1
                    })
                });
            }
        }

        console.log(padding + 'end. winner is ' + winner);
        console.log('');

        return trees;
    },

    findBestTurn: function (turnsTree) {
        // todo: find cell with max number of neighbourhoods - center cell

        // 1. unroll tree into list
        // 2. filter by winning branches
        // 3. if no winning branches then filter by draw
        // 4. sort by turn cell's neighbourhoods count
        // 5. return first turn

        //console.log(turnsTree);

        return (function unroll(tree, level) {
            var list = [];
            for (var i = 0; i < tree.length; i++) {
                if (tree[i].next.length == 0) {
                    return
                }
            }
            return list;
        }(turnsTree, 0));
    },

    makeTurn: function (parameters) {
        var model = parameters.model;
        var size = parameters.size;
        var seqLength = parameters.seqLength;
        var player = parameters.player;
        var complexity = parameters.complexity || 3;
        // todo: complexity level

        var turnTrees = [];
        var nMaxTurns = 10;

        //var freeCells = utils.findPossibleTurns(model, size);
        //console.log(freeCells);
        //
        //var newModel = _.clone(model);
        //newModel[freeCell.i] = player;
        //
        //var winner = this.findWinner(newModel, size, seqLength);
        //console.log('winner: ' + winner);

        return newModel;
    }

};

module.exports = ai;