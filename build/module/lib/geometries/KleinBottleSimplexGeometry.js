import * as tslib_1 from "tslib";
import { GridSimplexBuilder } from '../geometries/GridSimplexBuilder';
import { Vector3 } from '../math/Vector3';
var cos = Math.cos;
var sin = Math.sin;
var pi = Math.PI;
function klein(u, v) {
    var point = new Vector3();
    u = u * 2 * pi;
    v = v * 2 * pi;
    if (u < pi) {
        point.x = 3 * cos(u) * (1 + sin(u)) + (2 * (1 - cos(u) / 2)) * cos(u) * cos(v);
        point.z = -8 * sin(u) - 2 * (1 - cos(u) / 2) * sin(u) * cos(v);
    }
    else {
        point.x = 3 * cos(u) * (1 + sin(u)) + (2 * (1 - cos(u) / 2)) * cos(v + pi);
        point.z = -8 * sin(u);
    }
    point.y = -2 * (1 - cos(u) / 2) * sin(v);
    return point.scale(0.1);
}
var KleinBottleSimplexGeometry = (function (_super) {
    tslib_1.__extends(KleinBottleSimplexGeometry, _super);
    function KleinBottleSimplexGeometry(uSegments, vSegments) {
        return _super.call(this, klein, uSegments, vSegments) || this;
    }
    return KleinBottleSimplexGeometry;
}(GridSimplexBuilder));
export { KleinBottleSimplexGeometry };
