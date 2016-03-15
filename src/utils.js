const utils = {

    cmp: (a, b) =>
        a.length == b.length && a.every((x, i) => x == b[i]),

    compare: function (a, b) {

        if (a.length != b.length)
            return false;

        for (var i = 0; i < a.length; i++) {
            if (a[i] != b[i])
                return false;
        }

        return true;
    },

    row: function (model, nRow, size) {
        var row = [];
        for (var i = 0; i < size; i++) {
            row.push(model[nRow*size + i]);
        }
        return row;
    },

    col: function (model, nCol, size) {
        var col = [];
        for (var i = 0; i < size; i++) {
            col.push(model[nCol + i*size]);
        }
        return col;
    }

};

module.exports = utils;