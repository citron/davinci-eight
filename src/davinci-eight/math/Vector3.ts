// Be careful not to create circularity.
// Only use Matrix4 in type positions.
// Otherwise, create standalone functions.
import Cartesian3 = require('../math/Cartesian3');
import Matrix4 = require('../math/Matrix4');
import Spinor3 = require('../math/Spinor3');

/**
 * @class Vector3
 */
class Vector3 {
  private $x: number;
  private $y: number;
  private $z: number;
  public modified: boolean;
  public static e1 = new Vector3({x: 1, y: 0, z: 0});
  public static e2 = new Vector3({x: 0, y: 1, z: 0});
  public static e3 = new Vector3({x: 0, y: 0, z: 1});
  /**
   * @class Vector3
   * @constructor
   * @param vector [{x,y,z}]
   */
  constructor(vector?: Cartesian3) {
    this.$x = vector ? vector.x : 0;
    this.$y = vector ? vector.y : 0;
    this.$z = vector ? vector.z : 0;
    this.modified = false;
  }
  /**
   * @property x
   * @type Number
   */
  get x(): number {
    return this.$x;
  }
  set x(value: number) {
    this.modified = this.modified || this.$x !== value;
    this.$x = value;
  }
  /**
   * @property y
   * @type Number
   */
  get y(): number {
    return this.$y;
  }
  set y(value: number) {
    this.modified = this.modified || this.$y !== value;
    this.$y = value;
  }
  /**
   * @property z
   * @type Number
   */
  get z(): number {
    return this.$z;
  }
  set z(value: number) {
    this.modified = this.modified || this.$z !== value;
    this.$z = value;
  }
  /**
   * Performs in-place addition of vectors.
   *
   * @method add
   * @param v {Vector3} The vector to add to this vector.
   */
  add(v: Cartesian3): Vector3 {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }
  applyMatrix4(m: Matrix4) {

    // input: THREE.Matrix4 affine matrix

    var x = this.x, y = this.y, z = this.z;

    var e = m.elements;

    this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ]  * z + e[ 12 ];
    this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ]  * z + e[ 13 ];
    this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ];

    return this;
  }
  applyQuaternion(q: {x: number, y: number, z: number, w: number}): Vector3 {
    let x = this.x;
    let y = this.y;
    let z = this.z;

    let qx = q.x;
    let qy = q.y;
    let qz = q.z;
    let qw = q.w;

    // calculate quat * vector

    let ix =  qw * x + qy * z - qz * y;
    let iy =  qw * y + qz * x - qx * z;
    let iz =  qw * z + qx * y - qy * x;
    let iw = - qx * x - qy * y - qz * z;

    // calculate (quat * vector) * inverse quat

    this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    return this;
  }
  applySpinor(spinor: Spinor3): Vector3 {
    let x = this.x;
    let y = this.y;
    let z = this.z;

    let qx = spinor.yz;
    let qy = spinor.zx;
    let qz = spinor.xy;
    let qw = spinor.w;

    // calculate quat * vector

    let ix =  qw * x + qy * z - qz * y;
    let iy =  qw * y + qz * x - qx * z;
    let iz =  qw * z + qx * y - qy * x;
    let iw = - qx * x - qy * y - qz * z;

    // calculate (quat * vector) * inverse quat

    this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
    this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
    this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

    return this;
  }
  clone(): Vector3 {
    return new Vector3({ x: this.x, y: this.y, z: this.z });
  }
  copy(v: Vector3): Vector3 {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  cross(v: Vector3): Vector3 {
    return this.crossVectors(this, v);
  }
  crossVectors(a: Cartesian3, b: Cartesian3): Vector3 {
    var ax = a.x, ay = a.y, az = a.z;
    var bx = b.x, by = b.y, bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
  }
  distance(v: Cartesian3): number {
    return Math.sqrt(this.quadrance(v));
  }
  quadrance(v: Cartesian3): number {
    var dx = this.x - v.x;
    var dy = this.y - v.y;
    var dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  }
  divideScalar(scalar: number): Vector3 {
    if (scalar !== 0) {
      let invScalar = 1 / scalar;
      this.x *= invScalar;
      this.y *= invScalar;
      this.z *= invScalar;
    }
    else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
    return this;
  }
  dot(v: Cartesian3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  length(): number {
    let x = this.x;
    let y = this.y;
    let z = this.z;
    return Math.sqrt(x * x + y * y + z * z);
  }
  lerp(v: Cartesian3, alpha: number): Vector3 {
    this.x += ( v.x - this.x ) * alpha;
    this.y += ( v.y - this.y ) * alpha;
    this.z += ( v.z - this.z ) * alpha;
    return this;

  }
  normalize(): Vector3 {
    return this.divideScalar(this.length());
  }
  multiply(v: Cartesian3): Vector3 {
    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  }
  multiplyScalar(scalar: number): Vector3 {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }
  set(x: number, y: number, z: number): Vector3 {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  setX(x: number): Vector3 {
    this.x = x;
    return this;
  }
  setY(y: number): Vector3 {
    this.y = y;
    return this;
  }
  setZ(z: number): Vector3 {
    this.z = z;
    return this;
  }
  sub(v: Cartesian3): Vector3 {
    return this.subVectors(this, v);
  }
  subVectors(a: Cartesian3, b: Cartesian3): Vector3 {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  }
  /**
   * @method toString
   * @return {string} A non-normative string representation of the target.
   */
  toString(): string
  {
    return "Vector3({x: " + this.x + ", y: " + this.y + ", z: " + this.z + "})"
  }
}

export = Vector3;