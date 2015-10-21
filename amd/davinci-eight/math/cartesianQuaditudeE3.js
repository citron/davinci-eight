define(["require", "exports"], function (require, exports) {
    /**
     * Computes the dot product of the Cartesian components in a Euclidean metric
     */
    function cartesianQuaditudeE3(ax, ay, az, bx, by, bz) {
        return ax * bx + ay * by + az * bz;
    }
    return cartesianQuaditudeE3;
});
