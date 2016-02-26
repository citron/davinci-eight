import Coords from '../math/Coords';
import dotVectorCartesian from '../math/dotVectorCartesianE2';
import Measure from '../math/Measure';
import mustBeInteger from '../checks/mustBeInteger';
import mustBeNumber from '../checks/mustBeNumber';
import mustBeObject from '../checks/mustBeObject';
import Mutable from '../math/Mutable';
import MutableGeometricElement from '../math/MutableGeometricElement';
import notSupported from '../i18n/notSupported'
import quadSpinor from '../math/quadSpinorE2';
import rotorFromDirections from '../math/rotorFromDirectionsE2';
import SpinorE2 from '../math/SpinorE2';
import VectorE2 from '../math/VectorE2';
import wedgeXY from '../math/wedgeXY';

/**
 * @module EIGHT
 * @submodule math
 */

// Symbolic constants for the coordinate indices into the coords array.
const COORD_SCALAR = 1
const COORD_PSEUDO = 0

function one(): number[] {
    const coords = [0, 0]
    coords[COORD_SCALAR] = 1
    coords[COORD_PSEUDO] = 0
    return coords
}

const abs = Math.abs
const atan2 = Math.atan2
const log = Math.log
const cos = Math.cos
const sin = Math.sin
const sqrt = Math.sqrt

/**
 * @class Spinor2
 * @extends Coords
 */
export default class Spinor2 extends Coords implements SpinorE2, Measure<Spinor2>, Mutable<number[]>, MutableGeometricElement<SpinorE2, Spinor2, Spinor2, VectorE2> {
    /**
     * Constructs a <code>Spinor2</code> from a <code>number[]</code>.
     * For a <em>geometric</em> implementation, use the static methods.
     * @class Spinor2
     * @constructor
     */
    constructor(coordinates = one(), modified = false) {
        super(coordinates, modified, 2)
    }

    /**
     * The bivector part of this spinor as a number.
     * @property xy
     * @type {number}
     */
    get xy(): number {
        return this.coords[COORD_PSEUDO];
    }
    set xy(xy: number) {
        mustBeNumber('xy', xy)
        this.modified = this.modified || this.xy !== xy;
        this.coords[COORD_PSEUDO] = xy;
    }

    /**
     * The scalar part of this spinor as a number.
     * @property alpha
     * @type {number}
     */
    get alpha(): number {
        return this.coords[COORD_SCALAR];
    }
    set alpha(alpha: number) {
        mustBeNumber('alpha', alpha)
        this.modified = this.modified || this.alpha !== alpha;
        this.coords[COORD_SCALAR] = alpha;
    }

    /**
     * The scalar part of this spinor as a number.
     * @property α
     * @type {number}
     */
    get α(): number {
        return this.coords[COORD_SCALAR];
    }
    set α(α: number) {
        mustBeNumber('α', α)
        this.modified = this.modified || this.α !== α;
        this.coords[COORD_SCALAR] = α;
    }

    /**
     * The pseudoscalar part of this spinor as a number.
     * @property β
     * @type number
     * @readOnly
     */
    get β(): number {
        return this.coords[COORD_PSEUDO];
    }
    set β(β: number) {
        mustBeNumber('β', β)
        this.modified = this.modified || this.β !== β;
        this.coords[COORD_PSEUDO] = β;
    }

    /**
     * The pseudoscalar part of this spinor as a number.
     * @property beta
     * @type number
     * @readOnly
     */
    get beta(): number {
        return this.coords[COORD_PSEUDO];
    }
    set beta(beta: number) {
        mustBeNumber('beta', beta)
        this.modified = this.modified || this.beta !== beta;
        this.coords[COORD_PSEUDO] = beta;
    }

    /**
     * <p>
     * <code>this ⟼ this + α * spinor</code>
     * </p>
     * @method add
     * @param spinor {SpinorE2}
     * @param [α = 1] {number}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    add(spinor: SpinorE2, α = 1): Spinor2 {
        mustBeObject('spinor', spinor)
        mustBeNumber('α', α)
        this.xy += spinor.β * α
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
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    add2(a: SpinorE2, b: SpinorE2): Spinor2 {
        this.α = a.α + b.α
        this.xy = a.β + b.β
        return this;
    }

    /**
     * Intentionally undocumented.
     */
    addPseudo(β: number): Spinor2 {
        mustBeNumber('β', β)
        return this
    }

    /**
     * <p>
     * <code>this ⟼ this + α</code>
     * </p>
     * @method addScalar
     * @param α {number}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    addScalar(α: number): Spinor2 {
        mustBeNumber('α', α)
        this.α += α
        return this
    }

    /**
     * @method adj
     * @return {number}
     * @beta
     */
    adj(): Spinor2 {
        throw new Error('TODO: Spinor2.adj')
    }

    /**
     * @method angle
     * @return {Spinor2}
     */
    angle(): Spinor2 {
        return this.log().grade(2);
    }

    /**
     * @method clone
     * @return {Spinor2} A copy of <code>this</code>.
     * @chainable
     */
    clone(): Spinor2 {
        const spinor = Spinor2.copy(this)
        spinor.modified = this.modified
        return spinor
    }

    /**
     * <p>
     * <code>this ⟼ (w, -B)</code>
     * </p>
     * @method conj
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    conj() {
        this.xy = -this.xy
        return this
    }

    /**
     * <p>
     * <code>this ⟼ copy(spinor)</code>
     * </p>
     * @method copy
     * @param spinor {SpinorE2}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    copy(spinor: SpinorE2): Spinor2 {
        mustBeObject('spinor', spinor)
        this.xy = mustBeNumber('spinor.β', spinor.β)
        this.α = mustBeNumber('spinor.α', spinor.α)
        return this;
    }

    /**
     * Sets this spinor to the value of the scalar, <code>α</code>.
     * @method copyScalar
     * @param α {number} The scalar to be copied.
     * @return {Spinor2}
     * @chainable
     */
    copyScalar(α: number): Spinor2 {
        return this.zero().addScalar(α)
    }

    /**
     * Intentionally undocumented.
     */
    copySpinor(spinor: SpinorE2): Spinor2 {
        return this.copy(spinor);
    }

    /**
     * Intentionally undocumented.
     */
    copyVector(vector: VectorE2): Spinor2 {
        // The spinor has no vector components.
        return this.zero()
    }

    cos(): Spinor2 {
        throw new Error("Spinor2.cos")
    }

    cosh(): Spinor2 {
        throw new Error("Spinor2.cosh")
    }

    /**
     * <p>
     * <code>this ⟼ this / s</code>
     * </p>
     * @method div
     * @param s {SpinorE2}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    div(s: SpinorE2): Spinor2 {
        return this.div2(this, s)
    }

    /**
     * <p>
     * <code>this ⟼ a / b</code>
     * </p>
     * @method div2
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    div2(a: SpinorE2, b: SpinorE2): Spinor2 {
        let a0 = a.α;
        let a1 = a.β;
        let b0 = b.α;
        let b1 = b.β;
        let quadB = quadSpinor(b)
        this.α = (a0 * b0 + a1 * b1) / quadB
        this.xy = (a1 * b0 - a0 * b1) / quadB
        return this;
    }

    /**
     * <p>
     * <code>this ⟼ this / α</code>
     * </p>
     * @method divByScalar
     * @param α {number}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    divByScalar(α: number): Spinor2 {
        this.xy /= α
        this.α /= α
        return this
    }

    /**
     * <p>
     * <code>this ⟼ e<sup>this</sup></code>
     * </p>
     *
     * @method exp
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    exp(): Spinor2 {

        const α = this.α
        const β = this.β

        const expA = Math.exp(α)
        // φ is actually the absolute value of one half the rotation angle.
        // The orientation of the rotation gets carried in the bivector components.
        // FIXME: DRY
        const φ = sqrt(β * β)
        const s = expA * (φ !== 0 ? sin(φ) / φ : 1)
        this.α = expA * cos(φ);
        this.β = β * s;
        return this;
    }
    /**
     * <p>
     * <code>this ⟼ conj(this) / quad(this)</code>
     * </p>
     * @method inv
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    inv(): Spinor2 {
        this.conj()
        this.divByScalar(this.squaredNormSansUnits());
        return this
    }

    lco(rhs: SpinorE2): Spinor2 {
        return this.lco2(this, rhs)
    }

    lco2(a: SpinorE2, b: SpinorE2): Spinor2 {
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
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    // FIXME: Should really be slerp?
    lerp(target: SpinorE2, α: number): Spinor2 {
        var Vector2 = Spinor2.copy(target)
        var Vector1 = this.clone()
        var R = Vector2.mul(Vector1.inv())
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
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    lerp2(a: SpinorE2, b: SpinorE2, α: number): Spinor2 {
        this.sub2(b, a).scale(α).add(a)
        return this
    }
    /**
     * <p>
     * <code>this ⟼ log(this)</code>
     * </p>
     * @method log
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    log(): Spinor2 {
        // FIXME: This is wrong see Geometric2.
        let w = this.α
        let z = this.xy
        // FIXME: DRY
        let bb = z * z
        let Vector2 = sqrt(bb)
        let R0 = abs(w)
        let R = sqrt(w * w + bb)
        this.α = log(R)
        let f = atan2(Vector2, R0) / Vector2
        this.xy = z * f
        return this;
    }

    /**
     * Computes the <em>square root</em> of the <em>squared norm</em>.
     * @method magnitude
     * @return {Spinor2}
     */
    magnitude(): Spinor2 {
        return this.norm();
    }

    magnitudeSansUnits(): number {
        return sqrt(this.squaredNormSansUnits());
    }

    /**
     * <p>
     * <code>this ⟼ this * s</code>
     * </p>
     * @method mul
     * @param s {SpinorE2}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    mul(s: SpinorE2): Spinor2 {
        return this.mul2(this, s)
    }

    /**
     * <p>
     * <code>this ⟼ a * b</code>
     * </p>
     * @method mul2
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    mul2(a: SpinorE2, b: SpinorE2) {
        let a0 = a.α
        let a1 = a.β
        let b0 = b.α
        let b1 = b.β
        this.α = a0 * b0 - a1 * b1
        this.xy = a0 * b1 + a1 * b0
        return this
    }

    /**
     * @method neg
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    neg(): Spinor2 {
        this.α = -this.α
        this.xy = -this.xy
        return this;
    }

    /**
     * <p>
     * <code>this ⟼ sqrt(this * conj(this))</code>
     * </p>
     * @method norm
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    norm(): Spinor2 {
        const norm = this.magnitudeSansUnits();
        return this.zero().addScalar(norm);
    }

    /**
     * <p>
     * <code>this ⟼ this / magnitude(this)</code>
     * </p>
     * @method direction
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    direction(): Spinor2 {
        const modulus = this.magnitudeSansUnits();
        this.xy = this.xy / modulus;
        this.α = this.α / modulus;
        return this;
    }

    /**
     * Sets this spinor to the identity element for multiplication, <b>1</b>.
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    one() {
        this.α = 1;
        this.xy = 0;
        return this;
    }

    pow(): Spinor2 {
        throw new Error("Spinor2.pow")
    }

    /**
     * <p>
     * <code>this ⟼ this * conj(this)</code>
     * </p>
     * @method quad
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    quad(): Spinor2 {
        return this.squaredNorm();
    }

    sin(): Spinor2 {
        throw new Error("Spinor2.sin")
    }

    sinh(): Spinor2 {
        throw new Error("Spinor2.sinh")
    }

    /**
     * @method squaredNorm
     * @return {SpinH2} <code>this * conj(this)</code>
     */
    squaredNorm(): Spinor2 {
        const squaredNorm = this.squaredNormSansUnits()
        return this.zero().addScalar(squaredNorm)
    }

    /**
     * Intentionally undocumented.
     */
    squaredNormSansUnits(): number {
        return quadSpinor(this)
    }

    rco(rhs: SpinorE2): Spinor2 {
        return this.rco2(this, rhs)
    }

    rco2(a: SpinorE2, b: SpinorE2): Spinor2 {
        // FIXME: How to leverage? Maybe break up? Don't want performance hit.
        // scpG2(a, b, this)
        return this
    }

    /**
     * <p>
     * <code>this = (w, B) ⟼ (w, -B)</code>
     * </p>
     * @method reverse
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    rev(): Spinor2 {
        this.xy *= - 1;
        return this;
    }

    /**
     * Sets this Spinor to the value of its reflection in the plane orthogonal to n.
     * The geometric formula for bivector reflection is B' = n * B * n.
     * @method reflect
     * @param n {VectorE2}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    reflect(n: VectorE2): Spinor2 {
        let w = this.α;
        let β = this.xy;
        let nx = n.x;
        let ny = n.y;
        let nn = nx * nx + ny * ny
        this.α = nn * w
        this.xy = - nn * β
        return this;
    }

    /**
     * <p>
     * <code>this = ⟼ rotor * this * rev(rotor)</code>
     * </p>
     * @method rotate
     * @param rotor {SpinorE2}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    rotate(rotor: SpinorE2): Spinor2 {
        console.warn("Spinor2.rotate is not implemented")
        return this;
    }

    /**
     * <p>
     * Sets this multivector to a rotation from vector <code>a</code> to vector <code>b</code>.
     * </p>
     * @method rotorFromDirections
     * @param a {VectorE2} The <em>from</em> vector.
     * @param b {VectorE2} The <em>to</em> vector.
     * @return {Spinor2} <code>this</code> The rotor representing a rotation from a to b.
     * @chainable
     */
    rotorFromDirections(a: VectorE2, b: VectorE2): Spinor2 {
        rotorFromDirections(a, b, this)
        return this
    }

    /**
     * <p>
     * <code>this = ⟼ exp(- B * θ / 2)</code>
     * </p>
     * @method rotorFromGeneratorAngle
     * @param B {SpinorE2}
     * @param θ {number}
     * @return {Spinor2} <code>this</code>
     */
    rotorFromGeneratorAngle(B: SpinorE2, θ: number): Spinor2 {
        let φ = θ / 2
        let s = sin(φ)
        this.xy = -B.β * s
        this.α = cos(φ)
        return this
    }

    scp(rhs: SpinorE2): Spinor2 {
        return this.scp2(this, rhs)
    }
    scp2(a: SpinorE2, b: SpinorE2): Spinor2 {
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
     * @return {Spinor2} <code>this</code>
     */
    scale(α: number): Spinor2 {
        mustBeNumber('α', α)
        this.xy *= α;
        this.α *= α;
        return this;
    }

    slerp(target: SpinorE2, α: number): Spinor2 {
        const Vector2 = Spinor2.copy(target)
        const Vector1 = this.clone()
        const R = Vector2.mul(Vector1.inv())
        R.log()
        R.scale(α)
        R.exp()
        this.copy(R)
        return this
    }

    stress(σ: VectorE2): Spinor2 {
        throw new Error(notSupported('stress').message)
    }


    /**
     * <p>
     * <code>this ⟼ this - s * α</code>
     * </p>
     * @method sub
     * @param s {SpinorE2}
     * @param [α = 1] {number}
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    sub(s: SpinorE2, α = 1): Spinor2 {
        mustBeObject('s', s)
        mustBeNumber('α', α)
        this.xy -= s.β * α
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
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    sub2(a: SpinorE2, b: SpinorE2): Spinor2 {
        this.xy = a.β - b.β
        this.α = a.α - b.α
        return this;
    }
    /**
     * <p>
     * <code>this ⟼ a * b</code>
     * </p>
     * Sets this Spinor2 to the geometric product a * b of the vector arguments.
     *
     * @method versor
     * @param a {VectorE2}
     * @param b {VectorE2}
     * @return {Spinor2}
     */
    versor(a: VectorE2, b: VectorE2) {

        const ax = a.x
        const ay = a.y
        const bx = b.x
        const by = b.y

        this.α = dotVectorCartesian(ax, ay, bx, by)
        // TODO: Optimize because we aren't using z.
        this.xy = wedgeXY(ax, ay, 0, bx, by, 0)

        return this
    }

    grade(grade: number): Spinor2 {
        mustBeInteger('grade', grade)
        switch (grade) {
            case 0: {
                this.xy = 0;
            }
                break;
            case 2: {
                this.α = 0;
            }
                break;
            default: {
                this.α = 0;
                this.xy = 0;
            }
        }
        return this;
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
        return "Spinor2({β: " + this.xy + ", w: " + this.α + "})"
    }
    ext(rhs: SpinorE2): Spinor2 {
        return this.ext2(this, rhs)
    }
    ext2(a: SpinorE2, b: SpinorE2): Spinor2 {
        // FIXME: How to leverage? Maybe break up? Don't want performance hit.
        // scpG2(a, b, this)
        return this
    }

    /**
     * Sets this spinor to the identity element for addition, <b>0</b>.
     * @return {Spinor2} <code>this</code>
     * @chainable
     */
    zero(): Spinor2 {
        this.α = 0
        this.xy = 0
        return this
    }

    /**
     * @method copy
     * @param spinor {SpinorE2}
     * @return {Spinor2} A copy of the <code>spinor</code> argument.
     * @static
     */
    static copy(spinor: SpinorE2): Spinor2 {
        return new Spinor2().copy(spinor)
    }

    /**
     * @method lerp
     * @param a {SpinorE2}
     * @param b {SpinorE2}
     * @param α {number}
     * @return {Spinor2} <code>a + α * (b - a)</code>
     * @static
     */
    static lerp(a: SpinorE2, b: SpinorE2, α: number): Spinor2 {
        return Spinor2.copy(a).lerp(b, α)
    }

    /**
     * Computes the rotor that rotates vector <code>a</code> to vector <code>b</code>.
     * @method rotorFromDirections
     * @param a {VectorE2} The <em>from</em> vector.
     * @param b {VectorE2} The <em>to</em> vector.
     * @return {Spinor2}
     * @static
     */
    static rotorFromDirections(a: VectorE2, b: VectorE2): Spinor2 {
        return new Spinor2().rotorFromDirections(a, b)
    }
}
