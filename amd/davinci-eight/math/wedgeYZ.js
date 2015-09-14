define(["require", "exports"], function (require, exports) {
    /**
     * Computes the x component of the cross-product of Cartesian vector components.
     */
    function wedgeYZ(ax, ay, az, bx, by, bz) {
        return ay * bz - az * by;
    }
    return wedgeYZ;
});