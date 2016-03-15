var utils = require('./utils');

var ai = {

    checkWinnerByRow: function (model, nRow, size) {

        var row = model.slice(nRow*size, nRow*size + size);
        console.log(row);

        return utils.cmp(row, [1, 1, 1])
            || utils.cmp(row, [2, 2, 2])
        ;
    },

    checkWinnerByCol: function (model, nCol, size) {

        var col = model.slice(nCol*size, nCol*size + size);
        console.log(col);

        return utils.cmp(col, [1, 1, 1])
            || utils.cmp(col, [2, 2, 2])
        ;
    },

    // wild area //////////

    step: function (model, turn) {
        return model;
    },

    findWinner(model) {
        console.log('# findWinner');

        //console.log(checkWinnerByRow(model, 0));
        //console.log(checkWinnerByRow(model, 1));
        //console.log(checkWinnerByRow(model, 2));
        //
        //console.log(checkWinnerByCol(model, 0));
        //console.log(checkWinnerByCol(model, 1));
        //console.log(checkWinnerByCol(model, 2));

    }
};

module.exports = ai;