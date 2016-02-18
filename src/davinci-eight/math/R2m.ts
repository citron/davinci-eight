import ColumnVector from '../math/ColumnVector';
import b2 from '../geometries/b2';
import b3 from '../geometries/b3';
import Mat2R from '../math/Mat2R';
import MutableLinearElement from '../math/MutableLinearElement';
import notImplemented from '../i18n/notImplemented';
import SpinorE2 from '../math/SpinorE2';
import stringFromCoordinates from '../math/stringFromCoordinates';
import VectorN from '../math/VectorN';
import VectorE2 from '../math/VectorE2';

/**
 * @module EIGHT
 * @submodule math
 */

const sqrt = Math.sqrt;

const COORD_X = 0;
const COORD_Y = 1;

/**
 * @class R2m
 */
export default class R2m extends VectorN<number> implements ColumnVector<Mat2R, R2m>, VectorE2, MutableLinearElement<VectorE2, R2m, SpinorE2, VectorE2> {
    /**
     * @class R2m
     * @constructor
     * @param [data = [0, 0]] {number[]} Default is [0, 0].
     * @param [modified = false] {boolean} Default is false.
     */
    constructor(data = [0, 0], modified = false) {
        super(data, modified, 2);
    }

    /**
     * @property x
     * @type number
     */
    get x(): number {
        return this.coords[COORD_X];
    }
    set x(value: number) {
        this.modified = this.modified || this.x !== value;
        this.coords[COORD_X] = value;
    }

    /**
     * @property y
     * @type number
     */
    get y(): number {
        return this.coords[COORD_Y];
    }

    set y(value: number) {
        this.modified = this.modified || this.y !== value;
        this.coords[COORD_Y] = value;
    }

    /**
     * @method add
     * @param v {VectorE2}
     * @param [α = 1] {number}
     * @return {R2m}
     * @chainable
     */
    add(v: VectorE2, α = 1): R2m {
        this.x += v.x * α
        this.y += v.y * α
        return this
    }

    /**
     * @method add2
     * @param a {VectorE2}
     * @param b {VectorE2}
     * @return {R2m}
     * @chainable
     */
    add2(a: VectorE2, b: VectorE2): R2m {
        this.x = a.x + b.x
        this.y = a.y + b.y
        return this
    }

    /**
     * <p>
     * <code>this ⟼ m * this<sup>T</sup></code>
     * </p>
     *
     * @method applyMatrix
     * @param m {Mat2R}
     * @return {R2m} <code>this</code>
     * @chainable
     */
    applyMatrix(m: Mat2R): R2m {
        let x = this.x;
        let y = this.y;

        let e = m.elements;

        this.x = e[0x0] * x + e[0x2] * y;
        this.y = e[0x1] * x + e[0x3] * y;

        return this;
    }

    /**
     * @method clone
     * @return {R2m}
     * @chainable
     */
    clone(): R2m {
        return new R2m([this.x, this.y])
    }

    /**
     * @method copy
     * @param v {VectorE2}
     * @return {R2m}
     * @chainable
     */
    copy(v: VectorE2): R2m {
        this.x = v.x
        this.y = v.y
        return this
    }

    /**
     * @method cubicBezier
     * @param t {number}
     * @param controlBegin {VectorE2}
     * @param endPoint {VectorE2}
     * @return {R2m}
     * @chainable
     */
    cubicBezier(t: number, controlBegin: VectorE2, controlEnd: VectorE2, endPoint: VectorE2): R2m {
        const x = b3(t, this.x, controlBegin.x, controlEnd.x, endPoint.x)
        const y = b3(t, this.y, controlBegin.y, controlEnd.y, endPoint.y)
        this.x = x
        this.y = y
        return this
    }

    /**
     * @method distanceTo
     * @param point {VectorE2}
     * @return {number}
     */
    distanceTo(position: VectorE2) {
        return sqrt(this.quadranceTo(position));
    }

    /**
     * @method sub
     * @param v {VectorE2}
     * @return {R2m}
     * @chainable
     */
    sub(v: VectorE2): R2m {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    /*
    subScalar(s: number) {
        this.x -= s;
        this.y -= s;
        return this;
    }
    */

    /**
     * @method sub2
     * @param a {VectorE2}
     * @param b {VectorE2}
     * @return {R2m}
     * @chainable
     */
    sub2(a: VectorE2, b: VectorE2): R2m {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }

    /**
     * @method scale
     * @param α {number}
     * @return {R2m}
     * @chainable
     */
    scale(α: number): R2m {
        this.x *= α
        this.y *= α
        return this
    }

    /**
     *
     */
    divByScalar(scalar: number) {
        if (scalar !== 0) {
            var invScalar = 1 / scalar;
            this.x *= invScalar;
            this.y *= invScalar;
        }
        else {
            this.x = 0;
            this.y = 0;
        }
        return this;
    }
    min(v: VectorE2) {
        if (this.x > v.x) {
            this.x = v.x;
        }
        if (this.y > v.y) {
            this.y = v.y;
        }
        return this;
    }
    max(v: VectorE2) {
        if (this.x < v.x) {
            this.x = v.x;
        }
        if (this.y < v.y) {
            this.y = v.y;
        }
        return this;
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    ceil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    round() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    roundToZero() {
        this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
        return this;
    }

    /**
     * @method neg
     * @return {R2m} <code>this</code>
     * @chainable
     */
    neg() {
        this.x = -this.x
        this.y = -this.y
        return this
    }

    dot(v: VectorE2) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * Computes the <em>square root</em> of the <em>squared norm</em>.
     *
     * @method magnitude
     * @return {number}
     */
    magnitude(): number {
        return sqrt(this.squaredNorm());
    }

    direction() {
        return this.divByScalar(this.magnitude())
    }

    squaredNorm(): number {
        return this.x * this.x + this.y * this.y;
    }

    quadranceTo(position: VectorE2) {
        let dx = this.x - position.x;
        let dy = this.y - position.y;
        return dx * dx + dy * dy;
    }

    /**
     * @method quadraticBezier
     * @param t {number}
     * @param controlPoint {VectorE2}
     * @param endPoint {VectorE2}
     * @return {R2m}
     */
    quadraticBezier(t: number, controlPoint: VectorE2, endPoint: VectorE2): R2m {
        const x = b2(t, this.x, controlPoint.x, endPoint.x);
        const y = b2(t, this.y, controlPoint.y, endPoint.y);
        this.x = x;
        this.y = y;
        return this
    }

    reflect(n: VectorE2): R2m {
        throw new Error(notImplemented('reflect').message)
    }

    /**
     * @method rotate
     * @param spinor {SpinorE2}
     * @return {R2m}
     * @chainable
     */
    rotate(spinor: SpinorE2): R2m {
        const x = this.x
        const y = this.y

        const α = spinor.α
        const β = spinor.β

        const p = α * α - β * β
        const q = 2 * α * β

        this.x = p * x + q * y
        this.y = p * y - q * x

        return this
    }

    /**
     * this ⟼ this + (v - this) * α
     *
     * @method lerp
     * @param v {VectorE2}
     * @param α {number}
     * @return {R2m}
     * @chainable 
     */
    lerp(v: VectorE2, α: number): R2m {
        this.x += (v.x - this.x) * α
        this.y += (v.y - this.y) * α
        return this
    }

    /**
     * <p>
     * <code>this ⟼ a + α * (b - a)</code>
     * </p>
     *
     * @method lerp2
     * @param a {VectorE2}
     * @param b {VectorE2}
     * @param α {number}
     * @return {R2m} <code>this</code>
     * @chainable
     */
    lerp2(a: VectorE2, b: VectorE2, α: number): R2m {
        this.copy(a).lerp(b, α)
        return this
    }

    equals(v: VectorE2): boolean {
        return ((v.x === this.x) && (v.y === this.y));
    }

    slerp(v: VectorE2, α: number): R2m {
        throw new Error(notImplemented('slerp').message)
    }

    /**
     * @method toExponential
     * @return {string}
     */
    toExponential(): string {
        const coordToString = function(coord: number): string { return coord.toExponential() };
        return stringFromCoordinates(this.coords, coordToString, ['e1', 'e2'])
    }

    /**
     * @method toFixed
     * @param [fractionDigits] {number}
     * @return {string}
     */
    toFixed(fractionDigits?: number): string {
        const coordToString = function(coord: number): string { return coord.toFixed(fractionDigits) };
        return stringFromCoordinates(this.coords, coordToString, ['e1', 'e2'])
    }

    /**
     * @method toString
     * @return {string}
     */
    toString(): string {
        const coordToString = function(coord: number): string { return coord.toString() };
        return stringFromCoordinates(this.coords, coordToString, ['e1', 'e2'])
    }

    fromArray(array: number[], offset = 0) {
        this.x = array[offset];
        this.y = array[offset + 1];
        return this;
    }

    fromAttribute(attribute: { itemSize: number, array: number[] }, index: number, offset = 0) {
        index = index * attribute.itemSize + offset;
        this.x = attribute.array[index];
        this.y = attribute.array[index + 1];
        return this;
    }

    /**
     * Sets this vector to the identity element for addition, <b>0</b>.
     *
     * @method zero
     * @return {R2m}
     * @chainable
     */
    zero(): R2m {
        this.x = 0
        this.y = 0
        return this
    }

    /**
     * @method copy
     *
     * @param vector {VectorE2}
     * @return {R2m}
     * @static
     */
    static copy(vector: VectorE2): R2m {
        return R2m.vector(vector.x, vector.y)
    }

    /**
     * @method lerp
     * @param a {VectorE2}
     * @param b {VectorE2}
     * @param α {number}
     * @return {R2m} <code>a + α * (b - a)</code>
     * @static
     */
    static lerp(a: VectorE2, b: VectorE2, α: number): R2m {
        return R2m.copy(b).sub(a).scale(α).add(a)
    }

    /**
     * @method random
     *
     * @return {R2m}
     * @static
     */
    static random(): R2m {
        return R2m.vector(Math.random(), Math.random())
    }

    /**
     * @method vector
     * @param x {number}
     * @param y {number}
     * @return {R2m}
     * @static
     */
    static vector(x: number, y: number): R2m {
        return new R2m([x, y])
    }
}