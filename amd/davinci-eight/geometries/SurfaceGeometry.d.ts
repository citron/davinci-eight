import Cartesian3 = require('../math/Cartesian3');
import Geometry3 = require('../geometries/Geometry3');
/**
 * @author zz85 / https://github.com/zz85
 * Parametric Surfaces Geometry
 * based on the brilliant article by @prideout http://prideout.net/blog/?p=44
 *
 * new SurfaceGeometry( parametricFunction, uSegments, vSegments );
 */
declare class SurfaceGeometry extends Geometry3 {
    constructor(parametricFunction: (u: number, v: number) => Cartesian3, uSegments: number, vSegments: number);
}
export = SurfaceGeometry;
