import GridSimplexGeometry = require('../geometries/GridSimplexGeometry');
import MutableVectorE3 = require('../math/MutableVectorE3');

let cos = Math.cos;
let sin = Math.sin;
let pi = Math.PI;

function mobius(u: number, v: number): MutableVectorE3 {
  var point = new MutableVectorE3([0, 0, 0]);
  /**
   * radius
   */
  var R = 1;
  /**
   * half-width
   */
  var w = 0.05;

  var s = (2 * u - 1) * w; // [-w, w]
  var t = 2 * pi * v;     // [0, 2pi]

  point.x = (R + s * cos(t/2)) * cos(t);
  point.y = (R + s * cos(t/2)) * sin(t);
  point.z = s * sin(t/2);
  return point;
}

/**
 * http://virtualmathmuseum.org/Surface/moebius_strip/moebius_strip.html
 */
class MobiusStripSimplexGeometry extends GridSimplexGeometry {
  constructor(uSegments: number, vSegments: number) {
    super(mobius, uSegments, vSegments);
  }
}

export = MobiusStripSimplexGeometry;
