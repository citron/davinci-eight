var VectorN = require('../math/VectorN');
function isVectorN(values) {
    return values instanceof VectorN;
}
function checkValues(values) {
    if (!isVectorN(values)) {
        throw new Error("values must be a VectorN");
    }
    return values;
}
function isExactMultipleOf(numer, denom) {
    return numer % denom === 0;
}
function checkSize(size, values) {
    if (typeof size === 'number') {
        if (!isExactMultipleOf(values.length, size)) {
            throw new Error("values.length must be an exact multiple of size");
        }
    }
    else {
        throw new Error("size must be a number");
    }
    return size;
}
/**
 * Holds all the values of a particular attribute.
 * The size property describes how to break up the values.
 * The length of the values should be an integer multiple of the size.
 */
var DrawAttribute = (function () {
    function DrawAttribute(values, size) {
        this.values = checkValues(values);
        this.size = checkSize(size, values);
    }
    return DrawAttribute;
})();
module.exports = DrawAttribute;
