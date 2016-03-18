var utils = require('./utils');

var ai = {

    findWinnerByRow: function (model, nRow, size, seqLength) {
        var row = utils.sliceRow(model, nRow, size);

        var xScore = 0;
        var oScore = 0;

        for (var i = 0; i < size; i++) {
            var cell = row[i];

            if (cell == 1) xScore++;
            else xScore = 0;

            if (cell == 2) oScore++;
            else oScore = 0;

            if (xScore >= seqLength) return 1;
            if (oScore >= seqLength) return 2;
        }

        return 0;
    },

    findWinnerByCol: function (model, nCol, size, seqLength) {
        var col = utils.sliceColumn(model, nCol, size);

        var xScore = 0;
        var oScore = 0;

        for (var i = 0; i < size; i++) {
            var cell = col[i];

            if (cell == 1) xScore++;
            else xScore = 0;

            if (cell == 2) oScore++;
            else oScore = 0;

            if (xScore >= seqLength) return 1;
            if (oScore >= seqLength) return 2;
        }

        return 0;
    },

    findWinnerByDiagonal: function (model, isLeftTopToRightDown, size, seqLength) {
        var hypo =
            isLeftTopToRightDown ?
                utils.sliceLeftTopToRightBottomDiagonal(model, size) :
                utils.sliceRightTopToLeftBottomDiagonal(model, size);

        var xScore = 0;
        var oScore = 0;

        for (var i = 0; i < size; i++) {
            var cell = hypo[i];

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

    }

};

module.exports = ai;