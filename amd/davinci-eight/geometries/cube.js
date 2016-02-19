define(["require", "exports", '../geometries/quadrilateral', '../core/GraphicsProgramSymbols', '../math/Vector2', '../math/Vector3'], function (require, exports, quadrilateral_1, GraphicsProgramSymbols_1, Vector2_1, Vector3_1) {
    function cube(size) {
        if (size === void 0) { size = 1; }
        var s = size / 2;
        var vec0 = new Vector3_1.default([+s, +s, +s]);
        var vec1 = new Vector3_1.default([-s, +s, +s]);
        var vec2 = new Vector3_1.default([-s, -s, +s]);
        var vec3 = new Vector3_1.default([+s, -s, +s]);
        var vec4 = new Vector3_1.default([+s, -s, -s]);
        var vec5 = new Vector3_1.default([+s, +s, -s]);
        var vec6 = new Vector3_1.default([-s, +s, -s]);
        var vec7 = new Vector3_1.default([-s, -s, -s]);
        var c00 = new Vector2_1.default([0, 0]);
        var c01 = new Vector2_1.default([0, 1]);
        var c10 = new Vector2_1.default([1, 0]);
        var c11 = new Vector2_1.default([1, 1]);
        var attributes = {};
        attributes[GraphicsProgramSymbols_1.default.ATTRIBUTE_TEXTURE_COORDS] = [c11, c01, c00, c10];
        var front = quadrilateral_1.default(vec0, vec1, vec2, vec3, attributes);
        var right = quadrilateral_1.default(vec0, vec3, vec4, vec5, attributes);
        var top = quadrilateral_1.default(vec0, vec5, vec6, vec1, attributes);
        var left = quadrilateral_1.default(vec1, vec6, vec7, vec2, attributes);
        var bottom = quadrilateral_1.default(vec7, vec4, vec3, vec2, attributes);
        var back = quadrilateral_1.default(vec4, vec7, vec6, vec5, attributes);
        var squares = [front, right, top, left, bottom, back];
        return squares.reduce(function (a, b) { return a.concat(b); }, []);
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = cube;
});
