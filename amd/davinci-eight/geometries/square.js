define(["require", "exports", '../geometries/quadrilateral', '../core/GraphicsProgramSymbols', '../math/Vector2', '../math/Vector3'], function (require, exports, quadrilateral_1, GraphicsProgramSymbols_1, Vector2_1, Vector3_1) {
    function square(size) {
        if (size === void 0) { size = 1; }
        var s = size / 2;
        var vec0 = new Vector3_1.default([+s, +s, 0]);
        var vec1 = new Vector3_1.default([-s, +s, 0]);
        var vec2 = new Vector3_1.default([-s, -s, 0]);
        var vec3 = new Vector3_1.default([+s, -s, 0]);
        var c00 = new Vector2_1.default([0, 0]);
        var c01 = new Vector2_1.default([0, 1]);
        var c10 = new Vector2_1.default([1, 0]);
        var c11 = new Vector2_1.default([1, 1]);
        var coords = [c11, c01, c00, c10];
        var attributes = {};
        attributes[GraphicsProgramSymbols_1.default.ATTRIBUTE_TEXTURE_COORDS] = coords;
        return quadrilateral_1.default(vec0, vec1, vec2, vec3, attributes);
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = square;
});
