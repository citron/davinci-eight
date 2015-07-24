import Spinor3Coords = require('../math/Spinor3Coords');
import Cartesian3 = require('../math/Cartesian3');
/**
 * 4x4 matrix integrating with WebGL.
 * @class Matrix4
 *
 * The correspondence between the elements property index and the matrix entries is...
 *
 *  0  4  8 12
 *  1  5  9 13
 *  2  6 10 14
 *  3  7 11 15
 */
class Matrix4 {
  /**
   * @property elements
   * @type Float32Array
   */
  public elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  /**
   * Constructs the Matrix4 initialized to the identity matrix.
   * @constructor
   */
  constructor() {
  }
  identity(): Matrix4 {
    this.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1);
    return this;
  }
  /**
   *
   */
  frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {

    var te = this.elements;
    var x = 2 * near / ( right - left );
    var y = 2 * near / ( top - bottom );

    var a = ( right + left ) / ( right - left );
    var b = ( top + bottom ) / ( top - bottom );
    var c = - ( far + near ) / ( far - near );
    var d = - 2 * far * near / ( far - near );

    te[ 0 ] = x;  te[ 4 ] = 0;  te[ 8 ]  = a;  te[ 12 ] = 0;
    te[ 1 ] = 0;  te[ 5 ] = y;  te[ 9 ]  = b;  te[ 13 ] = 0;
    te[ 2 ] = 0;  te[ 6 ] = 0;  te[ 10 ] = c;  te[ 14 ] = d;
    te[ 3 ] = 0;  te[ 7 ] = 0;  te[ 11 ] = -1;  te[ 15 ] = 0;

    return this;
  }
  makeRotationAxis(axis: Cartesian3, angle: number) {

    // Based on http://www.gamedev.net/reference/articles/article1199.asp

    var c = Math.cos( angle );
    var s = Math.sin( angle );
    var t = 1 - c;
    var x = axis.x, y = axis.y, z = axis.z;
    var tx = t * x, ty = t * y;

    this.set(

      tx * x + c, tx * y - s * z, tx * z + s * y, 0,
      tx * y + s * z, ty * y + c, ty * z - s * x, 0,
      tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
      0, 0, 0, 1

    );

     return this;

  }
  mul(m: Matrix4): Matrix4 {
    return this.multiplyMatrices(this, m);
  }
  multiplyMatrices(a: Matrix4, b: Matrix4): Matrix4 {
    var ae = a.elements;
    var be = b.elements;
    var te = this.elements;

    var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[ 8 ], a14 = ae[ 12 ];
    var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[ 9 ], a24 = ae[ 13 ];
    var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
    var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

    var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[ 8 ], b14 = be[ 12 ];
    var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[ 9 ], b24 = be[ 13 ];
    var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
    var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

    te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[ 4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[ 8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[ 5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[ 9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[ 6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    te[ 3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[ 7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return this;
  }
  /**
   * Sets the elements of the target matrix to the perspective transformation.
   * The perspective transformation maps homogeneous world coordinates into
   * a cubic viewing volume such that an orthogonal projection of that viewing
   * volume will give the correct linear perspective.
   * @method perspective
   * @param fov {Number} field of view in the vertical direction, measured in radians.
   * @param aspect {Number} The ratio of view width divided by view height.
   * @param near {Number} The distance to the near field plane.
   * @param far {Number} The distance to the far field plane.
   */
  perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
    // We can leverage the frustum function, although technically the
    // symmetry in this perspective transformation should reduce the amount
    // of computation required.
    let ymax: number = near * Math.tan(fov * 0.5);   // top
    let ymin: number = - ymax;                       // bottom
    let xmin: number = ymin * aspect;                // left
    let xmax: number = ymax * aspect;                // right
    return this.frustum(xmin, xmax, ymin, ymax, near, far);
  }
  /**
   * @method rotate
   * @param attitude  The spinor from which the rotation will be computed.
   */
  rotate(spinor: Spinor3Coords): Matrix4 {
    // The correspondence between quaternions and spinors is
    // i <=> -e2^e3, j <=> -e3^e1, k <=> -e1^e2.
    let x: number = -spinor.yz;
    let y: number = -spinor.zx;
    let z: number = -spinor.xy;
    let w: number =  spinor.w;

    let x2 = x + x, y2 = y + y, z2 = z + z;
    let xx = x * x2, xy = x * y2, xz = x * z2;
    let yy = y * y2, yz = y * z2, zz = z * z2;
    let wx = w * x2, wy = w * y2, wz = w * z2;

    this.set(
      1 - yy - zz, xy - wz,     xz + wy,     0,
      xy + wz,     1 - xx - zz, yz - wx,     0,
      xz - wy,     yz + wx,     1 - xx - yy, 0,
      0,           0,           0,           1
      );

    return this;
  }
  /**
   * @method
   * @param i {number} the zero-based index of the row.
   */
  row(i: number): number[] {
    let te = this.elements;
    return [te[0 + i], te[4 + i], te[8 + i], te[12 + i]];
  }
  scale(x: number, y: number, z: number): Matrix4 {
    this.set(
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    );
    return this;
  }
  set(
    n11: number,
    n12: number,
    n13: number,
    n14: number,
    n21: number,
    n22: number,
    n23: number,
    n24: number,
    n31: number,
    n32: number,
    n33: number,
    n34: number,
    n41: number,
    n42: number,
    n43: number,
    n44: number): Matrix4 {

    var te = this.elements;

    te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
    te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
    te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
    te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;

    return this;
  }
  toFixed(n: number): string {
    let text: string[] = [];
    for (var i = 0; i <= 3;i++) {
      text.push(this.row(i).map(function(element: number, index: number) { return element.toFixed(n) }).join(' '));
    }
    return text.join('\n');
  }
  toString(): string {
    let text: string[] = [];
    for (var i = 0; i <= 3;i++) {
      text.push(this.row(i).map(function(element: number, index: number) { return element.toString() }).join(' '));
    }
    return text.join('\n');
  }
  translate(position: Cartesian3): Matrix4 {
    this.set(
      1, 0, 0, position.x,
      0, 1, 0, position.y,
      0, 0, 1, position.z,
      0, 0, 0, 1
    );
    return this;
  }
}

export = Matrix4;