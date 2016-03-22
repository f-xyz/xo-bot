const utils = {

    areAllItemsEqualTo: function (model, x) {
        return model.every(function (y) { return y === x; });
    },

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

    getPossibleTurns: function (model, size) {
        var freeCells = [];
        for (var i = 0; i < model.length; i++) {
            if (model[i] == 0) {
                var x = i % size;
                var y = Math.floor(i / size);
                freeCells.push({
                    x: x,
                    y: y,
                    i: i
                });
            }
        }
        return freeCells;
    },

    countNeighbourhoodsByIndex: function (model, i) {
        // todo
    },

    countNeighbourhoodsByXY: function (model, x, y) {
        // todo
    },

    dumpModel: function (model, size, paddingLeft) {
        for (var i = 0; i < Math.min(size, model.length); i++) {
            var row = model.slice(size*i, size*(i+1));
            var pad = new Array((paddingLeft || 0) + 1).join(' ');
            var m = pad + '|' + row.map(x => x).join(', ') + '|';
            console.log(m);
        }
    }

};

module.exports = utils;