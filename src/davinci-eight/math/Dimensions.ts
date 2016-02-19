import DivisionRingOperators from '../math/DivisionRingOperators';
import QQ from '../math/QQ';

/**
 * @module EIGHT
 * @submodule math
 */

const R0 = QQ.ZERO;
const Vector1 = QQ.ONE;
const M1 = QQ.MINUS_ONE;

function assertArgRational(name: string, arg: QQ): QQ {
    if (arg instanceof QQ) {
        return arg;
    }
    else {
        throw new Error("Argument '" + arg + "' must be a QQ");
    }
}

/**
 * @class Dimensions
 */
export default class Dimensions implements DivisionRingOperators<Dimensions> {

    /**
     * @property ONE
     * @type {Dimensions}
     * @static
     */
    public static ONE = new Dimensions(R0, R0, R0, R0, R0, R0, R0);

    /**
     * @property MASS
     * @type {Dimensions}
     * @static
     */
    public static MASS = new Dimensions(Vector1, R0, R0, R0, R0, R0, R0);

    /**
     * @property LENGTH
     * @type {Dimensions}
     * @static
     */
    public static LENGTH = new Dimensions(R0, Vector1, R0, R0, R0, R0, R0);

    /**
     * @property TIME
     * @type {Dimensions}
     * @static
     */
    public static TIME = new Dimensions(R0, R0, Vector1, R0, R0, R0, R0);

    /**
     * @property CHARGE
     * @type {Dimensions}
     * @static
     */
    public static CHARGE = new Dimensions(R0, R0, R0, Vector1, R0, R0, R0);

    /**
     * @property CURRENT
     * @type {Dimensions}
     * @static
     */
    public static CURRENT = new Dimensions(R0, R0, M1, Vector1, R0, R0, R0);

    /**
     * @property TEMPERATURE
     * @type {Dimensions}
     * @static
     */
    public static TEMPERATURE = new Dimensions(R0, R0, R0, R0, Vector1, R0, R0);

    /**
     * @property AMOUNT
     * @type {Dimensions}
     * @static
     */
    public static AMOUNT = new Dimensions(R0, R0, R0, R0, R0, Vector1, R0);

    /**
     * @property INTENSITY
     * @type {Dimensions}
     * @static
     */
    public static INTENSITY = new Dimensions(R0, R0, R0, R0, R0, R0, Vector1);

    /**
     * The Dimensions class captures the physical dimensions associated with a unit of measure.
     *
     * @class Dimensions
     * @constructor
     * @param {QQ} M The mass component of the dimensions object.
     * @param {QQ} L The length component of the dimensions object.
     * @param {QQ} T The time component of the dimensions object.
     * @param {QQ} Q The charge component of the dimensions object.
     * @param {QQ} temperature The temperature component of the dimensions object.
     * @param {QQ} amount The amount component of the dimensions object.
     * @param {QQ} intensity The intensity component of the dimensions object.
     */
    constructor(public M: QQ, public L: QQ, public T: QQ, public Q: QQ, public temperature: QQ, public amount: QQ, public intensity: QQ) {
        assertArgRational('M', M)
        assertArgRational('L', L)
        assertArgRational('T', T)
        assertArgRational('Q', Q)
        assertArgRational('temperature', temperature)
        assertArgRational('amount', amount)
        assertArgRational('intensity', intensity)
        if (arguments.length !== 7) {
            throw new Error("Expecting 7 arguments")
        }
    }

    /**
     * Returns the dimensions if they are all equal, otherwise throws an <code>Error</code>
     * @method compatible
     * @param rhs {Dimensions}
     * @return {Dimensions} <code>this</code>
     */
    compatible(rhs: Dimensions): Dimensions {
        if (this.M.equals(rhs.M) && this.L.equals(rhs.L) && this.T.equals(rhs.T) && this.Q.equals(rhs.Q) && this.temperature.equals(rhs.temperature) && this.amount.equals(rhs.amount) && this.intensity.equals(rhs.intensity)) {
            return this;
        }
        else {
            throw new Error("Dimensions must be equal (" + this + ", " + rhs + ")");
        }
    }

    /**
     * Multiplies dimensions by adding rational exponents.
     * @method mul
     * @param rhs {Dimensions}
     * @return {Dimensions} <code>this * rhs</code>
     */
    mul(rhs: Dimensions): Dimensions {
        return new Dimensions(this.M.add(rhs.M), this.L.add(rhs.L), this.T.add(rhs.T), this.Q.add(rhs.Q), this.temperature.add(rhs.temperature), this.amount.add(rhs.amount), this.intensity.add(rhs.intensity));
    }

    /**
     * Divides dimensions by subtracting rational exponents.
     * @method div
     * @param rhs {Dimensions}
     * @return {Dimensions} <code>this / rhs</code>
     */
    div(rhs: Dimensions): Dimensions {
        return new Dimensions(this.M.sub(rhs.M), this.L.sub(rhs.L), this.T.sub(rhs.T), this.Q.sub(rhs.Q), this.temperature.sub(rhs.temperature), this.amount.sub(rhs.amount), this.intensity.sub(rhs.intensity));
    }

    /**
     * Computes the power function by multiplying rational exponents.
     * @method div
     * @param rhs {Dimensions}
     * @return {Dimensions} <code>pow(this, rhs)</code>
     */
    pow(exponent: QQ): Dimensions {
        return new Dimensions(this.M.mul(exponent), this.L.mul(exponent), this.T.mul(exponent), this.Q.mul(exponent), this.temperature.mul(exponent), this.amount.mul(exponent), this.intensity.mul(exponent));
    }

    /**
     * Computes the square root by dividing each rational component by two.
     * @method sqrt
     * @return {Dimensions}
     */
    sqrt(): Dimensions {
        return new Dimensions(this.M.div(QQ.TWO), this.L.div(QQ.TWO), this.T.div(QQ.TWO), this.Q.div(QQ.TWO), this.temperature.div(QQ.TWO), this.amount.div(QQ.TWO), this.intensity.div(QQ.TWO));
    }

    /**
     * Determines whether all the exponents of this dimensions number are zero. 
     *
     * @method isOne
     * @return {boolean} <code>true</code> if all the components are zero, otherwise <code>false</code>.
     */
    isOne(): boolean {
        return this.M.isZero() && this.L.isZero() && this.T.isZero() && this.Q.isZero() && this.temperature.isZero() && this.amount.isZero() && this.intensity.isZero();
    }

    isZero(): boolean {
        return false
    }

    /**
     * Computes the multiplicative inverse of this dimensions number.
     * This is achived by changing the signs of all the exponent quantities.
     * @method inv
     * @return {Dimensions}
     */
    inv(): Dimensions {
        return new Dimensions(this.M.neg(), this.L.neg(), this.T.neg(), this.Q.neg(), this.temperature.neg(), this.amount.neg(), this.intensity.neg());
    }

    neg(): Dimensions {
        return this
    }

    /**
     * Creates a representation of this <code>Dimensions</code> instance.
     * @method toString
     * @return {string}
     */
    toString(): string {
        var stringify = function(rational: QQ, label: string): string {
            if (rational.numer === 0) {
                return null;
            } else if (rational.denom === 1) {
                if (rational.numer === 1) {
                    return "" + label;
                } else {
                    return "" + label + " ** " + rational.numer;
                }
            }
            return "" + label + " ** " + rational;
        };

        return [stringify(this.M, 'mass'), stringify(this.L, 'length'), stringify(this.T, 'time'), stringify(this.Q, 'charge'), stringify(this.temperature, 'thermodynamic temperature'), stringify(this.amount, 'amount of substance'), stringify(this.intensity, 'luminous intensity')].filter(function(x) {
            return typeof x === 'string';
        }).join(" * ");
    }

    /**
     * @method __add__
     * @param rhs {any}
     * @return {Dimensions}
     */
    __add__(rhs: any): Dimensions {
        if (rhs instanceof Dimensions) {
            return this.compatible(rhs)
        }
        else {
            return void 0
        }
    }

    /**
     * @method __radd__
     * @param lhs {any}
     * @return {Dimensions}
     */
    __radd__(lhs: any): Dimensions {
        if (lhs instanceof Dimensions) {
            return lhs.compatible(this)
        }
        else {
            return void 0
        }
    }

    /**
     * @method __sub__
     * @param rhs {any}
     * @return {Dimensions}
     */
    __sub__(rhs: any): Dimensions {
        if (rhs instanceof Dimensions) {
            return this.compatible(rhs)
        }
        else {
            return void 0
        }
    }

    /**
     * @method __rsub__
     * @param lhs {any}
     * @return {Dimensions}
     */
    __rsub__(lhs: any): Dimensions {
        if (lhs instanceof Dimensions) {
            return lhs.compatible(this)
        }
        else {
            return void 0
        }
    }

    /**
     * @method __mul__
     * @param rhs {any}
     * @return {Dimensions}
     */
    __mul__(rhs: any): Dimensions {
        if (rhs instanceof Dimensions) {
            return this.mul(rhs)
        }
        else {
            return void 0
        }
    }

    /**
     * @method __rmul__
     * @param lhs {any}
     * @return {Dimensions}
     */
    __rmul__(lhs: any): Dimensions {
        if (lhs instanceof Dimensions) {
            return lhs.mul(this)
        }
        else {
            return void 0
        }
    }

    /**
     * @method __div__
     * @param rhs {any}
     * @return {Dimensions}
     */
    __div__(rhs: any): Dimensions {
        if (rhs instanceof Dimensions) {
            return this.div(rhs)
        }
        else {
            return void 0
        }
    }

    /**
     * @method __rdiv__
     * @param lhs {any}
     * @return {Dimensions}
     */
    __rdiv__(lhs: any): Dimensions {
        if (lhs instanceof Dimensions) {
            return lhs.div(this)
        }
        else {
            return void 0
        }
    }

    /**
     * @method __pos__
     * @return {Dimensions}
     */
    __pos__(): Dimensions {
        return this
    }

    /**
     * @method __neg__
     * @return {Dimensions}
     */
    __neg__(): Dimensions {
        return this
    }
}
