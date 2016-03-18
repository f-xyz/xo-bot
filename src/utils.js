const utils = {

    compareArrays: function (a, b) {

        if (a.length != b.length)
            return false;

        for (var i = 0; i < a.length; i++) {
            if (a[i] != b[i])
                return false;
        }

        return true;
    },

    sliceRow: function (model, nRow, size) {
        var res = [];
        for (var i = 0; i < size; i++) {
            res.push(model[nRow*size + i]);
        }
        return res;
    },

    sliceColumn: function (model, nCol, size) {
        var res = [];
        for (var i = 0; i < size; i++) {
            res.push(model[nCol + i*size]);
        }
        return res;
    },

    sliceLeftTopToRightBottomDiagonal: function (model, size) {
        var res = [];
        for (var i = 0; i < size; i++) {
            res.push(model[i*(size+1)]);
        }
        return res;
    },

    sliceRightTopToLeftBottomDiagonal: function (model, size) {
        var res = [];
        for (var i = 0; i < size; i++) {
            res.push(model[i*(size-1) + (size-1)]);
        }
        return res;
    },

    dumpModel: function (model, size) {
        for (var i = 0; i < size; i++) {
            console.log(model.slice(size*i, size*(i+1)));
        }
    }

};

module.exports = utils;