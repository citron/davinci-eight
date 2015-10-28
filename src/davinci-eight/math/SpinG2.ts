import argSpinorCartesianE2 = require('../math/argSpinorCartesianE2')
import dotVectorCartesian = require('../math/dotVectorCartesianE2')
import copyToArray = require('../collections/copyToArray')
import dotVector = require('../math/dotVectorE2')
import expectArg = require('../checks/expectArg')
import isDefined = require('../checks/isDefined')
import MutableGeometricElement = require('../math/MutableGeometricElement')
import mustBeNumber = require('../checks/mustBeNumber')
import mustBeObject = require('../checks/mustBeObject')
import Mutable = require('../math/Mutable')
import quadSpinor = require('../math/quadSpinorE2')
import quadVector = require('../math/quadVectorE2')
import rotorFromDirections = require('../math/rotorFromDirections')
import SpinorE2 = require('../math/SpinorE2')
import TrigMethods = require('../math/TrigMethods')
import VectorE2 = require('../math/VectorE2')
import VectorN = require('../math/VectorN')
import wedgeXY = require('../math/wedgeXY')
import wedgeYZ = require('../math/wedgeYZ')
import wedgeZX = require('../math/wedgeZX')

// Symbolic constants for the coordinate indices into the data array.
let COORD_W = 1
let COORD_XY = 0

let PI = Math.PI
let abs = Math.abs
let atan2 = Math.atan2
let exp = Math.exp
let log = Math.log
let cos = Math.cos
let sin = Math.sin
let sqrt = Math.sqrt

/**
 * @class SpinG2
 * @extends VectorN<number>
 */
class SpinG2 extends VectorN<number> implements SpinorE2, Mutable<number[]>, MutableGeometricElement<SpinorE2, SpinG2, SpinG2, VectorE2>
{
    /**
     * Constructs a <code>SpinG2</code> from a <code>number[]</code>.
     * For a <em>geometric</em> implementation, use the static methods.
     * @class SpinG2
     * @constructor
     * @param coordinates {number[]}
     */
    constructor(coordinates: number[]) {
        super(coordinates, false, 2)
    }

    /**
     * The pseudoscalar part of this spinor as a number.
     * @property β
     * @type {number}
     */
    get β(): number {
        return this.data[COORD_XY];
    }
    set β(β: number) {
        mustBeNumber('β', β)
        this.modified = this.modified || this.β !== β;
        this.data[COORD_XY] = β;
    }

    /**
     * The scalar part of this spinor as a number.
     * @property α
     * @type {number}
     */
    get α(): number {
        return this.data[COORD_W];
    }
    set α(α: number) {
        mustBeNumber('α', α)
        this.modified = this.modified || this.α !== α;
        this.data[COORD_W] = α;
    }

    /**
     * <p>
     * <code>this ⟼ this + α * spinor</code>
     * </p>
     * @method add
     * @param spinor {SpinorE2}
     * @param α [number = 1]
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    add(spinor: SpinorE2, α: number = 1): SpinG2 {
        mustBeObject('spinor', spinor)
        mustBeNumber('α', α)
        this.β += spinor.β * α
        this.α += spinor.α * α
        return this
    }

    /**
     * <p>
     * <code>this ⟼ a + b</code>
     * </p>
     * @method add2
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    add2(a: SpinorE2, b: SpinorE2): SpinG2 {
        this.α = a.α + b.α
        this.β = a.β + b.β
        return this;
    }

    /**
     * Intentionally undocumented.
     */
    addPseudo(β: number): SpinG2 {
        mustBeNumber('β', β)
        this.β += β
        return this
    }

    /**
     * <p>
     * <code>this ⟼ this + α</code>
     * </p>
     * @method addScalar
     * @param α {number}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    addScalar(α: number): SpinG2 {
        mustBeNumber('α', α)
        this.α += α
        return this
    }

    /**
     * @method adj
     * @return {number}
     * @beta
     */
    adj(): SpinG2 {
        throw new Error('TODO: SpinG2.adj')
    }

    /**
     * @method arg
     * @return {number}
     */
    arg(): number {
        return argSpinorCartesianE2(this.α, this.β)
    }

    /**
     * @method clone
     * @return {SpinG2} A copy of <code>this</code>.
     * @chainable
     */
    clone(): SpinG2 {
        return SpinG2.copy(this)
    }

    /**
     * <p>
     * <code>this ⟼ (w, -B)</code>
     * </p>
     * @method conj
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    conj() {
        this.β = -this.β
        return this
    }

    /**
     * <p>
     * <code>this ⟼ copy(spinor)</code>
     * </p>
     * @method copy
     * @param spinor {SpinorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    copy(spinor: SpinorE2): SpinG2 {
        mustBeObject('spinor', spinor)
        this.β = mustBeNumber('spinor.β', spinor.β)
        this.α = mustBeNumber('spinor.α', spinor.α)
        return this;
    }

    /**
     * Sets this spinor to the value of the scalar, <code>α</code>.
     * @method copyScalar
     * @param α {number} The scalar to be copied.
     * @return {SpinG2}
     * @chainable
     */
    copyScalar(α: number): SpinG2 {
        return this.zero().addScalar(α)
    }

    /**
     * Intentionally undocumented.
     */
    copySpinor(spinor: SpinorE2): SpinG2 {
        return this.copy(spinor);
    }

    /**
     * Intentionally undocumented.
     */
    copyVector(vector: VectorE2): SpinG2 {
        // The spinor has no vector components.
        return this.zero()
    }

    /**
     * <p>
     * <code>this ⟼ this / s</code>
     * </p>
     * @method div
     * @param s {SpinorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    div(s: SpinorE2): SpinG2 {
        return this.div2(this, s)
    }

    /**
     * <p>
     * <code>this ⟼ a / b</code>
     * </p>
     * @method div2
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    div2(a: SpinorE2, b: SpinorE2): SpinG2 {
        let a0 = a.α;
        let a1 = a.β;
        let b0 = b.α;
        let b1 = b.β;
        let quadB = quadSpinor(b)
        this.α = (a0 * b0 + a1 * b1) / quadB
        this.β = (a1 * b0 - a0 * b1) / quadB
        return this;
    }

    /**
     * <p>
     * <code>this ⟼ this / α</code>
     * </p>
     * @method divByScalar
     * @param α {number}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    divByScalar(α: number): SpinG2 {
        this.β /= α
        this.α /= α
        return this
    }

    /**
     * <p>
     * <code>this ⟼ e<sup>this</sup></code>
     * </p>
     * @method exp
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    exp(): SpinG2 {
        let w = this.α
        let z = this.β
        let expW = exp(w)
        // φ is actually the absolute value of one half the rotation angle.
        // The orientation of the rotation gets carried in the bivector components.
        // FIXME: DRY
        let φ = sqrt(z * z)
        let s = expW * (φ !== 0 ? sin(φ) / φ : 1)
        this.α = expW * cos(φ);
        this.β = z * s;
        return this;
    }
    /**
     * <p>
     * <code>this ⟼ conj(this) / quad(this)</code>
     * </p>
     * @method inv
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    inv() {
        this.conj()
        this.divByScalar(this.squaredNorm());
        return this
    }

    lco(rhs: SpinorE2): SpinG2 {
        return this.lco2(this, rhs)
    }

    lco2(a: SpinorE2, b: SpinorE2): SpinG2 {
        // FIXME: How to leverage? Maybe break up? Don't want performance hit.
        // scpG2(a, b, this)
        return this
    }

    /**
     * <p>
     * <code>this ⟼ this + α * (target - this)</code>
     * </p>
     * @method lerp
     * @param target {SpinorE2}
     * @param α {number}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    // FIXME: Should really be slerp?
    lerp(target: SpinorE2, α: number): SpinG2 {
        var R2 = SpinG2.copy(target)
        var R1 = this.clone()
        var R = R2.mul(R1.inv())
        R.log()
        R.scale(α)
        R.exp()
        this.copy(R)
        return this
    }
    /**
     * <p>
     * <code>this ⟼ a + α * (b - a)</code>
     * <p>
     * @method lerp2
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @param α {number}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    lerp2(a: SpinorE2, b: SpinorE2, α: number): SpinG2 {
        this.sub2(b, a).scale(α).add(a)
        return this
    }
    /**
     * <p>
     * <code>this ⟼ log(this)</code>
     * </p>
     * @method log
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    log(): SpinG2 {
        let w = this.α
        let z = this.β
        // FIXME: DRY
        let bb = z * z
        let R2 = sqrt(bb)
        let R0 = abs(w)
        let R = sqrt(w * w + bb)
        this.α = log(R)
        let f = atan2(R2, R0) / R2
        this.β = z * f
        return this;
    }

    /**
     * @method magnitude
     * @return {number}
     */
    magnitude(): number {
        return sqrt(this.squaredNorm())
    }

    /**
     * <p>
     * <code>this ⟼ this * s</code>
     * </p>
     * @method mul
     * @param s {SpinorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    mul(s: SpinorE2): SpinG2 {
        return this.mul2(this, s)
    }

    /**
     * <p>
     * <code>this ⟼ a * b</code>
     * </p>
     * @method mul2
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    mul2(a: SpinorE2, b: SpinorE2) {
        let a0 = a.α
        let a1 = a.β
        let b0 = b.α
        let b1 = b.β
        this.α = a0 * b0 - a1 * b1
        this.β = a0 * b1 + a1 * b0
        return this
    }

    /**
     * @method neg
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    neg(): SpinG2 {
        this.α = -this.α
        this.β = -this.β
        return this;
    }

    /**
    * <p>
    * <code>this ⟼ sqrt(this * conj(this))</code>
    * </p>
    * @method norm
    * @return {SpinG2} <code>this</code>
    * @chainable
    */
    norm(): SpinG2 {
        let norm = this.magnitude()
        return this.zero().addScalar(norm)
    }
    /**
     * <p>
     * <code>this ⟼ this / magnitude(this)</code>
     * </p>
     * @method normalize
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    normalize(): SpinG2 {
        let modulus = this.magnitude()
        this.β = this.β / modulus
        this.α = this.α / modulus
        return this
    }
    /**
    * <p>
    * <code>this ⟼ this * conj(this)</code>
    * </p>
    * @method quad
    * @return {SpinG2} <code>this</code>
    * @chainable
    */
    quad(): SpinG2 {
        let squaredNorm = this.squaredNorm()
        return this.zero().addScalar(squaredNorm)
    }
    /**
     * @method squaredNorm
     * @return {number} <code>this * conj(this)</code>
     */
    squaredNorm(): number {
        return quadSpinor(this)
    }

    rco(rhs: SpinorE2): SpinG2 {
        return this.rco2(this, rhs)
    }

    rco2(a: SpinorE2, b: SpinorE2): SpinG2 {
        // FIXME: How to leverage? Maybe break up? Don't want performance hit.
        // scpG2(a, b, this)
        return this
    }

    /**
     * <p>
     * <code>this = (w, B) ⟼ (w, -B)</code>
     * </p>
     * @method reverse
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    rev(): SpinG2 {
        this.β *= - 1;
        return this;
    }
    /**
     * Sets this Spinor to the value of its reflection in the plane orthogonal to n.
     * The geometric formula for bivector reflection is B' = n * B * n.
     * @method reflect
     * @param n {VectorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    reflect(n: VectorE2): SpinG2 {
        let w = this.α;
        let β = this.β;
        let nx = n.x;
        let ny = n.y;
        let nn = nx * nx + ny * ny
        this.α = nn * w
        this.β = - nn * β
        return this;
    }
    /**
     * <p>
     * <code>this = ⟼ rotor * this * rev(rotor)</code>
     * </p>
     * @method rotate
     * @param rotor {SpinorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    rotate(rotor: SpinorE2): SpinG2 {
        console.warn("SpinG2.rotate is not implemented")
        return this;
    }
    /**
     * <p>
     * Sets this multivector to a rotation from vector <code>a</code> to vector <code>b</code>.
     * </p>
     * @method rotorFromDirections
     * @param a {VectorE2} The <em>from</em> vector.
     * @param b {VectorE2} The <em>to</em> vector.
     * @return {SpinG2} <code>this</code> The rotor representing a rotation from a to b.
     * @chainable
     */
    rotorFromDirections(a: VectorE2, b: VectorE2): SpinG2 {
        if (isDefined(rotorFromDirections(a, b, quadVector, dotVector, this))) {
            return this;
        }
        else {
            // In two dimensions, the rotation plane is not ambiguous.
            // FIXME: This is a bit dubious.
            // Probably better to make undefined a first-class concept.
            // ... this.undefined()
        }
    }

    /**
     * <p>
     * <code>this = ⟼ exp(- B * θ / 2)</code>
     * </p>
     * @method rotorFromGeneratorAngle
     * @param B {SpinorE2}
     * @param θ {number}
     * @return {SpinG2} <code>this</code>
     */
    rotorFromGeneratorAngle(B: SpinorE2, θ: number): SpinG2 {
        let φ = θ / 2
        let s = sin(φ)
        this.β = -B.β * s
        this.α = cos(φ)
        return this
    }

    scp(rhs: SpinorE2): SpinG2 {
        return this.scp2(this, rhs)
    }
    scp2(a: SpinorE2, b: SpinorE2): SpinG2 {
        // FIXME: How to leverage? Maybe break up? Don't want performance hit.
        // scpG2(a, b, this)
        return this
    }
    /**
     * <p>
     * <code>this ⟼ this * α</code>
     * </p>
     * @method scale
     * @param α {number}
     * @return {SpinG2} <code>this</code>
     */
    scale(α: number): SpinG2 {
        mustBeNumber('α', α)
        this.β *= α;
        this.α *= α;
        return this;
    }

    slerp(target: SpinorE2, α: number): SpinG2 {
        var R2 = SpinG2.copy(target)
        var R1 = this.clone()
        var R = R2.mul(R1.inv())
        R.log()
        R.scale(α)
        R.exp()
        this.copy(R)
        return this
    }

    /**
     * <p>
     * <code>this ⟼ this - s * α</code>
     * </p>
     * @method sub
     * @param s {SpinorE2}
     * @param α [number = 1]
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    sub(s: SpinorE2, α: number = 1): SpinG2 {
        mustBeObject('s', s)
        mustBeNumber('α', α)
        this.β -= s.β * α
        this.α -= s.α * α
        return this
    }
    /**
     * <p>
     * <code>this ⟼ a - b</code>
     * </p>
     * @method sub2
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    sub2(a: SpinorE2, b: SpinorE2): SpinG2 {
        this.β = a.β - b.β
        this.α = a.α - b.α
        return this;
    }
    /**
     * <p>
     * <code>this ⟼ a * b</code>
     * </p>
     * Sets this SpinG2 to the geometric product a * b of the vector arguments. 
     * @method spinor
     * @param a {VectorE2}
     * @param b {VectorE2}
     * @return {SpinG2}
     */
    spinor(a: VectorE2, b: VectorE2) {

        let ax = a.x
        let ay = a.y
        let bx = b.x
        let by = b.y

        this.α = dotVectorCartesian(ax, ay, bx, by)
        // TODO: This is a bit wasteful.
        this.β = wedgeXY(ax, ay, 0, bx, by, 0)

        return this
    }
    toExponential(): string {
        // FIXME: Do like others.
        return this.toString()
    }
    toFixed(digits?: number): string {
        // FIXME: Do like others.
        return this.toString()
    }
    /**
     * @method toString
     * @return {string} A non-normative string representation of the target.
     */
    toString(): string {
        return "SpinG2({β: " + this.β + ", w: " + this.α + "})"
    }
    ext(rhs: SpinorE2): SpinG2 {
        return this.ext2(this, rhs)
    }
    ext2(a: SpinorE2, b: SpinorE2): SpinG2 {
        // FIXME: How to leverage? Maybe break up? Don't want performance hit.
        // scpG2(a, b, this)
        return this
    }

    /**
     * Sets this spinor to the identity element for addition.
     * @return {SpinG2} <code>this</code>
     * @chainable
     */
    zero(): SpinG2 {
        this.α = 0
        this.β = 0
        return this
    }

    /**
     * @method copy
     * @param spinor {SpinorE2}
     * @return {SpinG2} A copy of the <code>spinor</code> argument.
     * @static
     */
    static copy(spinor: SpinorE2): SpinG2 {
        return new SpinG2([0, 0]).copy(spinor)
    }

    /**
     * @method lerp
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @param α {number}
     * @return {SpinG2} <code>a + α * (b - a)</code>
     * @static
     */
    static lerp(a: SpinorE2, b: SpinorE2, α: number): SpinG2 {
        return SpinG2.copy(a).lerp(b, α)
    }

    /**
     * Computes the rotor that rotates vector <code>a</code> to vector <code>b</code>.
     * @method rotorFromDirections
     * @param a {VectorE2} The <em>from</em> vector.
     * @param b {VectorE2} The <em>to</em> vector.
     * @return {SpinG2}
     * @static
     */
    static rotorFromDirections(a: VectorE2, b: VectorE2): SpinG2 {
        return new SpinG2([0, 0]).rotorFromDirections(a, b)
    }
}

export = SpinG2;