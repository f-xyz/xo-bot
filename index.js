'use strict';

var size = 3;
var seqLength = 3;

var utils = require('./src/utils');
var ai = require('./src/ai');

(function main() {
    var turn = 0;
    var model = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ];
    utils.dumpModel(model, size);
}());


