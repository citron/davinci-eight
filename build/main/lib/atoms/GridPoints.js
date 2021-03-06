"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BeginMode_1 = require("../core/BeginMode");
var GridPrimitive_1 = require("./GridPrimitive");
var mustBeInteger_1 = require("../checks/mustBeInteger");
var numPostsForFence_1 = require("./numPostsForFence");
/**
 * Computes the vertex index from integer coordinates.
 * Both lengths are included for symmetry!
 */
function vertexIndex(i, j, iLength, jLength) {
    mustBeInteger_1.mustBeInteger('iLength', iLength);
    mustBeInteger_1.mustBeInteger('jLength', jLength);
    return j * iLength + i;
}
function pointsForGrid(uSegments, uClosed, vSegments, vClosed) {
    var iLength = numPostsForFence_1.numPostsForFence(uSegments, uClosed);
    var jLength = numPostsForFence_1.numPostsForFence(vSegments, vClosed);
    var elements = [];
    for (var i = 0; i < iLength; i++) {
        for (var j = 0; j < jLength; j++) {
            elements.push(vertexIndex(i, j, iLength, jLength));
        }
    }
    return elements;
}
/**
 *
 */
var GridPoints = (function (_super) {
    tslib_1.__extends(GridPoints, _super);
    /**
     * @param uSegments
     * @param uClosed
     * @param vSegments
     * @param vClosed
     */
    function GridPoints(uSegments, uClosed, vSegments, vClosed) {
        var _this = _super.call(this, BeginMode_1.BeginMode.POINTS, uSegments, vSegments) || this;
        _this.elements = pointsForGrid(uSegments, uClosed, vSegments, vClosed);
        var iLength = numPostsForFence_1.numPostsForFence(uSegments, uClosed);
        var jLength = numPostsForFence_1.numPostsForFence(vSegments, vClosed);
        for (var i = 0; i < iLength; i++) {
            for (var j = 0; j < jLength; j++) {
                var coords = _this.vertex(i, j).coords;
                coords.setComponent(0, i);
                coords.setComponent(1, j);
            }
        }
        return _this;
    }
    /**
     * @param i An integer. 0 <= i < uLength
     * @param j An integer. 0 <= j < vLength
     */
    GridPoints.prototype.vertex = function (i, j) {
        mustBeInteger_1.mustBeInteger('i', i);
        mustBeInteger_1.mustBeInteger('j', j);
        return this.vertices[vertexIndex(i, j, this.uLength, this.vLength)];
    };
    return GridPoints;
}(GridPrimitive_1.GridPrimitive));
exports.GridPoints = GridPoints;
