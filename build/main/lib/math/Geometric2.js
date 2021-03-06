"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var applyMixins_1 = require("../utils/applyMixins");
var approx_1 = require("./approx");
var arraysEQ_1 = require("./arraysEQ");
var b2_1 = require("../geometries/b2");
var b3_1 = require("../geometries/b3");
var dotVectorE2_1 = require("./dotVectorE2");
var extE2_1 = require("./extE2");
var gauss_1 = require("./gauss");
var isDefined_1 = require("../checks/isDefined");
var isNumber_1 = require("../checks/isNumber");
var isObject_1 = require("../checks/isObject");
var lcoE2_1 = require("./lcoE2");
var Lockable_1 = require("../core/Lockable");
var Lockable_2 = require("../core/Lockable");
var Lockable_3 = require("../core/Lockable");
var mulE2_1 = require("./mulE2");
var mustBeEQ_1 = require("../checks/mustBeEQ");
var mustBeInteger_1 = require("../checks/mustBeInteger");
var mustBeNumber_1 = require("../checks/mustBeNumber");
var mustBeObject_1 = require("../checks/mustBeObject");
var notImplemented_1 = require("../i18n/notImplemented");
var notSupported_1 = require("../i18n/notSupported");
var rcoE2_1 = require("./rcoE2");
var rotorFromDirectionsE2_1 = require("./rotorFromDirectionsE2");
var scpE2_1 = require("./scpE2");
var stringFromCoordinates_1 = require("./stringFromCoordinates");
var wedgeXY_1 = require("./wedgeXY");
// symbolic constants for the coordinate indices into the data array.
var COORD_SCALAR = 0;
var COORD_X = 1;
var COORD_Y = 2;
var COORD_PSEUDO = 3;
var abs = Math.abs;
var atan2 = Math.atan2;
var exp = Math.exp;
var log = Math.log;
var cos = Math.cos;
var sin = Math.sin;
var sqrt = Math.sqrt;
var LEFTWARDS_ARROW = "←";
var RIGHTWARDS_ARROW = "→";
var UPWARDS_ARROW = "↑";
var DOWNWARDS_ARROW = "↓";
var CLOCKWISE_OPEN_CIRCLE_ARROW = "↻";
var ANTICLOCKWISE_OPEN_CIRCLE_ARROW = "↺";
var ARROW_LABELS = ["1", [LEFTWARDS_ARROW, RIGHTWARDS_ARROW], [DOWNWARDS_ARROW, UPWARDS_ARROW], [CLOCKWISE_OPEN_CIRCLE_ARROW, ANTICLOCKWISE_OPEN_CIRCLE_ARROW]];
var COMPASS_LABELS = ["1", ['W', 'E'], ['S', 'N'], [CLOCKWISE_OPEN_CIRCLE_ARROW, ANTICLOCKWISE_OPEN_CIRCLE_ARROW]];
var STANDARD_LABELS = ["1", "e1", "e2", "I"];
var zero = function zero() {
    return [0, 0, 0, 0];
};
var scalar = function scalar(a) {
    var coords = zero();
    coords[COORD_SCALAR] = a;
    return coords;
};
var vector = function vector(x, y) {
    var coords = zero();
    coords[COORD_X] = x;
    coords[COORD_Y] = y;
    return coords;
};
var pseudo = function pseudo(b) {
    var coords = zero();
    coords[COORD_PSEUDO] = b;
    return coords;
};
/**
 * Coordinates corresponding to basis labels.
 */
function coordinates(m) {
    var coords = zero();
    coords[COORD_SCALAR] = m.a;
    coords[COORD_X] = m.x;
    coords[COORD_Y] = m.y;
    coords[COORD_PSEUDO] = m.b;
    return coords;
}
/**
 * Promotes an unknown value to a Geometric2, or returns undefined.
 */
function duckCopy(value) {
    if (isObject_1.isObject(value)) {
        var m = value;
        if (isNumber_1.isNumber(m.x) && isNumber_1.isNumber(m.y)) {
            if (isNumber_1.isNumber(m.a) && isNumber_1.isNumber(m.b)) {
                console.warn("Copying GeometricE2 to Geometric2");
                return Geometric2.copy(m);
            }
            else {
                console.warn("Copying VectorE2 to Geometric2");
                return Geometric2.fromVector(m);
            }
        }
        else {
            if (isNumber_1.isNumber(m.a) && isNumber_1.isNumber(m.b)) {
                console.warn("Copying SpinorE2 to Geometric2");
                return Geometric2.fromSpinor(m);
            }
            else {
                return void 0;
            }
        }
    }
    else {
        return void 0;
    }
}
/**
 *
 */
var Geometric2 = (function () {
    /**
     * [scalar, x, y, pseudo]
     */
    function Geometric2(coords, modified) {
        if (coords === void 0) { coords = [0, 0, 0, 0]; }
        if (modified === void 0) { modified = false; }
        mustBeEQ_1.mustBeEQ('coords.length', coords.length, 4);
        this.coords_ = coords;
        this.modified_ = modified;
    }
    Object.defineProperty(Geometric2.prototype, "length", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometric2.prototype, "modified", {
        get: function () {
            return this.modified_;
        },
        set: function (modified) {
            if (this.isLocked()) {
                throw new Lockable_3.TargetLockedError('set modified');
            }
            this.modified_ = modified;
        },
        enumerable: true,
        configurable: true
    });
    Geometric2.prototype.getComponent = function (i) {
        return this.coords_[i];
    };
    Object.defineProperty(Geometric2.prototype, "a", {
        get: function () {
            return this.coords_[COORD_SCALAR];
        },
        set: function (a) {
            if (this.isLocked()) {
                throw new Lockable_3.TargetLockedError('set a');
            }
            var coords = this.coords_;
            this.modified_ = this.modified_ || coords[COORD_SCALAR] !== a;
            coords[COORD_SCALAR] = a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometric2.prototype, "x", {
        get: function () {
            return this.coords_[COORD_X];
        },
        set: function (x) {
            if (this.isLocked()) {
                throw new Lockable_3.TargetLockedError('set x');
            }
            var coords = this.coords_;
            this.modified_ = this.modified_ || coords[COORD_X] !== x;
            coords[COORD_X] = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometric2.prototype, "y", {
        get: function () {
            return this.coords_[COORD_Y];
        },
        set: function (y) {
            if (this.isLocked()) {
                throw new Lockable_3.TargetLockedError('set y');
            }
            var coords = this.coords_;
            this.modified_ = this.modified_ || coords[COORD_Y] !== y;
            coords[COORD_Y] = y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometric2.prototype, "b", {
        get: function () {
            return this.coords_[COORD_PSEUDO];
        },
        set: function (b) {
            if (this.isLocked()) {
                throw new Lockable_3.TargetLockedError('set b');
            }
            var coords = this.coords_;
            this.modified_ = this.modified_ || coords[COORD_PSEUDO] !== b;
            coords[COORD_PSEUDO] = b;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometric2.prototype, "xy", {
        /**
         *
         */
        get: function () {
            return this.coords_[COORD_PSEUDO];
        },
        set: function (xy) {
            if (this.isLocked()) {
                throw new Lockable_3.TargetLockedError('set xy');
            }
            var coords = this.coords_;
            this.modified_ = this.modified_ || coords[COORD_PSEUDO] !== xy;
            coords[COORD_PSEUDO] = xy;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * this ⟼ this + M * α
     */
    Geometric2.prototype.add = function (M, α) {
        if (α === void 0) { α = 1; }
        mustBeObject_1.mustBeObject('M', M);
        mustBeNumber_1.mustBeNumber('α', α);
        this.a += M.a * α;
        this.x += M.x * α;
        this.y += M.y * α;
        this.b += M.b * α;
        return this;
    };
    /**
     * this ⟼ a + b
     */
    Geometric2.prototype.add2 = function (a, b) {
        mustBeObject_1.mustBeObject('a', a);
        mustBeObject_1.mustBeObject('b', b);
        this.a = a.a + b.a;
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        this.b = a.b + b.b;
        return this;
    };
    /**
     * this ⟼ this + Iβ
     */
    Geometric2.prototype.addPseudo = function (β) {
        mustBeNumber_1.mustBeNumber('β', β);
        this.b += β;
        return this;
    };
    /**
     * this ⟼ this + α
     */
    Geometric2.prototype.addScalar = function (α) {
        mustBeNumber_1.mustBeNumber('α', α);
        this.a += α;
        return this;
    };
    /**
     * this ⟼ this + v * α
     */
    Geometric2.prototype.addVector = function (v, α) {
        if (α === void 0) { α = 1; }
        mustBeObject_1.mustBeObject('v', v);
        mustBeNumber_1.mustBeNumber('α', α);
        this.x += v.x * α;
        this.y += v.y * α;
        return this;
    };
    /**
     * arg(A) = grade(log(A), 2)
     *
     * @returns The arg of <code>this</code> multivector.
     */
    Geometric2.prototype.arg = function () {
        if (this.isLocked()) {
            return Lockable_1.lock(this.clone().arg());
        }
        else {
            return this.log().grade(2);
        }
    };
    /**
     *
     */
    Geometric2.prototype.approx = function (n) {
        approx_1.approx(this.coords_, n);
        return this;
    };
    /**
     * copy(this)
     */
    Geometric2.prototype.clone = function () {
        var m = new Geometric2([0, 0, 0, 0]);
        m.copy(this);
        return m;
    };
    /**
     * The Clifford conjugate.
     * The multiplier for the grade x is (-1) raised to the power x * (x + 1) / 2
     * The pattern of grades is +--++--+
     *
     * @returns conj(this)
     */
    Geometric2.prototype.conj = function () {
        // FIXME: This is only the bivector part.
        // Also need to think about various involutions.
        this.b = -this.b;
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.cos = function () {
        throw new Error(notImplemented_1.notImplemented('cos').message);
    };
    /**
     *
     */
    Geometric2.prototype.cosh = function () {
        throw new Error(notImplemented_1.notImplemented('cosh').message);
    };
    /**
     *
     */
    Geometric2.prototype.distanceTo = function (M) {
        var α = this.a - M.a;
        var x = this.x - M.x;
        var y = this.y - M.y;
        var β = this.b - M.b;
        return Math.sqrt(scpE2_1.scpE2(α, x, y, β, α, x, y, β, 0));
    };
    /**
     * this ⟼ copy(M)
     */
    Geometric2.prototype.copy = function (M) {
        mustBeObject_1.mustBeObject('M', M);
        this.a = M.a;
        this.x = M.x;
        this.y = M.y;
        this.b = M.b;
        return this;
    };
    /**
     * Sets this multivector to the value of the scalar, α.
     */
    Geometric2.prototype.copyScalar = function (α) {
        return this.zero().addScalar(α);
    };
    /**
     * this ⟼ copy(spinor)
     */
    Geometric2.prototype.copySpinor = function (spinor) {
        mustBeObject_1.mustBeObject('spinor', spinor);
        this.a = spinor.a;
        this.x = 0;
        this.y = 0;
        this.b = spinor.b;
        return this;
    };
    /**
     * this ⟼ copyVector(vector)
     */
    Geometric2.prototype.copyVector = function (vector) {
        mustBeObject_1.mustBeObject('vector', vector);
        this.a = 0;
        this.x = vector.x;
        this.y = vector.y;
        this.b = 0;
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.cubicBezier = function (t, controlBegin, controlEnd, endPoint) {
        var α = b3_1.b3(t, this.a, controlBegin.a, controlEnd.a, endPoint.a);
        var x = b3_1.b3(t, this.x, controlBegin.x, controlEnd.x, endPoint.x);
        var y = b3_1.b3(t, this.y, controlBegin.y, controlEnd.y, endPoint.y);
        var β = b3_1.b3(t, this.b, controlBegin.b, controlEnd.b, endPoint.b);
        this.a = α;
        this.x = x;
        this.y = y;
        this.b = β;
        return this;
    };
    /**
     * this ⟼ this / magnitude(this)
     */
    Geometric2.prototype.normalize = function () {
        if (this.isLocked()) {
            throw new Lockable_3.TargetLockedError('normalize');
        }
        var norm = this.magnitude();
        this.a = this.a / norm;
        this.x = this.x / norm;
        this.y = this.y / norm;
        this.b = this.b / norm;
        return this;
    };
    /**
     * this ⟼ this / m
     */
    Geometric2.prototype.div = function (m) {
        return this.div2(this, m);
    };
    /**
     * this ⟼ a / b
     */
    Geometric2.prototype.div2 = function (a, b) {
        // Invert b using this then multiply, being careful to account for the case
        // when a and this are the same instance by getting a's coordinates first.
        var a0 = a.a;
        var a1 = a.x;
        var a2 = a.y;
        var a3 = a.b;
        this.copy(b).inv();
        var b0 = this.a;
        var b1 = this.x;
        var b2 = this.y;
        var b3 = this.b;
        this.a = mulE2_1.mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
        this.x = mulE2_1.mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
        this.y = mulE2_1.mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
        this.b = mulE2_1.mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
        return this;
    };
    /**
     * this ⟼ this / α
     */
    Geometric2.prototype.divByScalar = function (α) {
        mustBeNumber_1.mustBeNumber('α', α);
        this.a /= α;
        this.x /= α;
        this.y /= α;
        this.b /= α;
        return this;
    };
    /**
     * this ⟼ dual(m) = I * m
     */
    Geometric2.prototype.dual = function (m) {
        var w = -m.b;
        var x = +m.y;
        var y = -m.x;
        var β = +m.a;
        this.a = w;
        this.x = x;
        this.y = y;
        this.b = β;
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.equals = function (other) {
        if (other instanceof Geometric2) {
            var that = other;
            return arraysEQ_1.arraysEQ(this.coords_, that.coords_);
        }
        else {
            return false;
        }
    };
    /**
     * this ⟼ exp(this)
     */
    Geometric2.prototype.exp = function () {
        var w = this.a;
        var z = this.b;
        var expW = exp(w);
        // φ is actually the absolute value of one half the rotation angle.
        // The orientation of the rotation gets carried in the bivector components.
        var φ = sqrt(z * z);
        var s = expW * (φ !== 0 ? sin(φ) / φ : 1);
        this.a = expW * cos(φ);
        this.b = z * s;
        return this;
    };
    /**
     * this ⟼ this ^ m
     */
    Geometric2.prototype.ext = function (m) {
        return this.ext2(this, m);
    };
    /**
     * this ⟼ a ^ b
     */
    Geometric2.prototype.ext2 = function (a, b) {
        var a0 = a.a;
        var a1 = a.x;
        var a2 = a.y;
        var a3 = a.b;
        var b0 = b.a;
        var b1 = b.x;
        var b2 = b.y;
        var b3 = b.b;
        this.a = extE2_1.extE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
        this.x = extE2_1.extE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
        this.y = extE2_1.extE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
        this.b = extE2_1.extE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
        return this;
    };
    /**
     * Sets this multivector to its inverse, if it exists.
     */
    Geometric2.prototype.inv = function () {
        // We convert the mutivector/geometric product into a tensor
        // representation with the consequence that inverting the multivector
        // is equivalent to solving a matrix equation, AX = b for X.
        var α = this.a;
        var x = this.x;
        var y = this.y;
        var β = this.b;
        var A = [
            [α, x, y, -β],
            [x, α, β, -y],
            [y, -β, α, x],
            [β, -y, x, α]
        ];
        var b = [1, 0, 0, 0];
        var X = gauss_1.gauss(A, b);
        this.a = X[0];
        this.x = X[1];
        this.y = X[2];
        this.b = X[3];
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.isOne = function () {
        return this.a === 1 && this.x === 0 && this.y === 0 && this.b === 0;
    };
    /**
     *
     */
    Geometric2.prototype.isZero = function () {
        return this.a === 0 && this.x === 0 && this.y === 0 && this.b === 0;
    };
    /**
     * this ⟼ this << m
     */
    Geometric2.prototype.lco = function (m) {
        return this.lco2(this, m);
    };
    /**
     * this ⟼ a << b
     */
    Geometric2.prototype.lco2 = function (a, b) {
        var a0 = a.a;
        var a1 = a.x;
        var a2 = a.y;
        var a3 = a.b;
        var b0 = b.a;
        var b1 = b.x;
        var b2 = b.y;
        var b3 = b.b;
        this.a = lcoE2_1.lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
        this.x = lcoE2_1.lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
        this.y = lcoE2_1.lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
        this.b = lcoE2_1.lcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
        return this;
    };
    /**
     * this ⟼ this + α * (target - this)
     */
    Geometric2.prototype.lerp = function (target, α) {
        mustBeObject_1.mustBeObject('target', target);
        mustBeNumber_1.mustBeNumber('α', α);
        this.a += (target.a - this.a) * α;
        this.x += (target.x - this.x) * α;
        this.y += (target.y - this.y) * α;
        this.b += (target.b - this.b) * α;
        return this;
    };
    /**
     * this ⟼ a + α * (b - a)
     */
    Geometric2.prototype.lerp2 = function (a, b, α) {
        mustBeObject_1.mustBeObject('a', a);
        mustBeObject_1.mustBeObject('b', b);
        mustBeNumber_1.mustBeNumber('α', α);
        this.copy(a).lerp(b, α);
        return this;
    };
    /**
     * this ⟼ log(sqrt(α * α + β * β)) + e1e2 * atan2(β, α),
     * where α is the scalar part of `this`,
     * and β is the pseudoscalar part of `this`.
     */
    Geometric2.prototype.log = function () {
        // FIXME: This only handles the spinor components.
        var α = this.a;
        var β = this.b;
        this.a = log(sqrt(α * α + β * β));
        this.x = 0;
        this.y = 0;
        this.b = atan2(β, α);
        return this;
    };
    /**
     * Computes the <em>square root</em> of the <em>squared norm</em>.
     *
     * This method does not change this multivector.
     */
    Geometric2.prototype.magnitude = function () {
        return sqrt(this.quaditude());
    };
    /**
     * this ⟼ this * m
     */
    Geometric2.prototype.mul = function (m) {
        return this.mul2(this, m);
    };
    /**
     * this ⟼ a * b
     */
    Geometric2.prototype.mul2 = function (a, b) {
        var a0 = a.a;
        var a1 = a.x;
        var a2 = a.y;
        var a3 = a.b;
        var b0 = b.a;
        var b1 = b.x;
        var b2 = b.y;
        var b3 = b.b;
        this.a = mulE2_1.mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
        this.x = mulE2_1.mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
        this.y = mulE2_1.mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
        this.b = mulE2_1.mulE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
        return this;
    };
    /**
     * this ⟼ -1 * this
     */
    Geometric2.prototype.neg = function () {
        this.a = -this.a;
        this.x = -this.x;
        this.y = -this.y;
        this.b = -this.b;
        return this;
    };
    /**
     * this ⟼ sqrt(this * conj(this))
     */
    Geometric2.prototype.norm = function () {
        this.a = this.magnitude();
        this.x = 0;
        this.y = 0;
        this.b = 0;
        return this;
    };
    /**
     * Sets this multivector to the identity element for multiplication, <b>1</b>.
     */
    Geometric2.prototype.one = function () {
        this.a = 1;
        this.x = 0;
        this.y = 0;
        this.b = 0;
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.pow = function (M) {
        mustBeObject_1.mustBeObject('M', M);
        throw new Error(notImplemented_1.notImplemented('pow').message);
    };
    /**
     * Updates <code>this</code> target to be the <em>quad</em> or <em>squared norm</em> of the target.
     *
     * this ⟼ scp(this, rev(this)) = this | ~this
     */
    Geometric2.prototype.quad = function () {
        this.a = this.quaditude();
        this.x = 0;
        this.y = 0;
        this.b = 0;
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.quadraticBezier = function (t, controlPoint, endPoint) {
        var α = b2_1.b2(t, this.a, controlPoint.a, endPoint.a);
        var x = b2_1.b2(t, this.x, controlPoint.x, endPoint.x);
        var y = b2_1.b2(t, this.y, controlPoint.y, endPoint.y);
        var β = b2_1.b2(t, this.b, controlPoint.b, endPoint.b);
        this.a = α;
        this.x = x;
        this.y = y;
        this.b = β;
        return this;
    };
    /**
     * this ⟼ this >> m
     */
    Geometric2.prototype.rco = function (m) {
        return this.rco2(this, m);
    };
    /**
     * this ⟼ a >> b
     */
    Geometric2.prototype.rco2 = function (a, b) {
        var a0 = a.a;
        var a1 = a.x;
        var a2 = a.y;
        var a3 = a.b;
        var b0 = b.a;
        var b1 = b.x;
        var b2 = b.y;
        var b3 = b.b;
        this.a = rcoE2_1.rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 0);
        this.x = rcoE2_1.rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 1);
        this.y = rcoE2_1.rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 2);
        this.b = rcoE2_1.rcoE2(a0, a1, a2, a3, b0, b1, b2, b3, 3);
        return this;
    };
    /**
     * this ⟼ - n * this * n
     */
    Geometric2.prototype.reflect = function (n) {
        mustBeObject_1.mustBeObject('n', n);
        var nx = n.x;
        var ny = n.y;
        mustBeNumber_1.mustBeNumber('n.x', nx);
        mustBeNumber_1.mustBeNumber('n.y', ny);
        var x = this.x;
        var y = this.y;
        var μ = nx * nx - ny * ny;
        var λ = -2 * nx * ny;
        this.a = -this.a;
        this.x = λ * y - μ * x;
        this.y = λ * x + μ * y;
        this.b = +this.b;
        return this;
    };
    /**
     * this ⟼ rev(this)
     */
    Geometric2.prototype.rev = function () {
        // reverse has a ++-- structure.
        this.a = this.a;
        this.x = this.x;
        this.y = this.y;
        this.b = -this.b;
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.sin = function () {
        throw new Error(notImplemented_1.notImplemented('sin').message);
    };
    /**
     *
     */
    Geometric2.prototype.sinh = function () {
        throw new Error(notImplemented_1.notImplemented('sinh').message);
    };
    /**
     * this ⟼ R * this * rev(R)
     */
    Geometric2.prototype.rotate = function (R) {
        mustBeObject_1.mustBeObject('R', R);
        var x = this.x;
        var y = this.y;
        var β = R.b;
        var α = R.a;
        var ix = α * x + β * y;
        var iy = α * y - β * x;
        this.x = ix * α + iy * β;
        this.y = iy * α - ix * β;
        return this;
    };
    /**
     * Sets this multivector to a rotation from vector <code>a</code> to vector <code>b</code>.
     */
    Geometric2.prototype.rotorFromDirections = function (a, b) {
        rotorFromDirectionsE2_1.rotorFromDirectionsE2(a, b, this);
        return this;
    };
    Geometric2.prototype.rotorFromVectorToVector = function (a, b) {
        rotorFromDirectionsE2_1.rotorFromDirectionsE2(a, b, this);
        return this;
    };
    /**
     * this ⟼ exp(- B * θ / 2)
     */
    Geometric2.prototype.rotorFromGeneratorAngle = function (B, θ) {
        mustBeObject_1.mustBeObject('B', B);
        mustBeNumber_1.mustBeNumber('θ', θ);
        // We assume that B really is just a bivector
        // by ignoring scalar and vector components.
        // Normally, B will have unit magnitude and B * B => -1.
        // However, we don't assume that is the case.
        // The effect will be a scaling of the angle.
        // A non unitary rotor, on the other hand, will scale the transformation.
        // We must also take into account the orientation of B.
        var β = B.b;
        /**
         * Sandwich operation means we need the half-angle.
         */
        var φ = θ / 2;
        /**
         * scalar part = cos(|B| * θ / 2)
         */
        this.a = cos(abs(β) * φ);
        this.x = 0;
        this.y = 0;
        /**
         * pseudo part = -unit(B) * sin(|B| * θ / 2)
         */
        this.b = -sin(β * φ);
        return this;
    };
    /**
     * this ⟼ scp(this, m)
     */
    Geometric2.prototype.scp = function (m) {
        return this.scp2(this, m);
    };
    /**
     * this ⟼ scp(a, b)
     */
    Geometric2.prototype.scp2 = function (a, b) {
        this.a = scpE2_1.scpE2(a.a, a.x, a.y, a.b, b.a, b.x, b.y, b.b, 0);
        this.x = 0;
        this.y = 0;
        this.b = 0;
        return this;
    };
    /**
     * this ⟼ this * α
     */
    Geometric2.prototype.scale = function (α) {
        mustBeNumber_1.mustBeNumber('α', α);
        this.a *= α;
        this.x *= α;
        this.y *= α;
        this.b *= α;
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.stress = function (σ) {
        mustBeObject_1.mustBeObject('σ', σ);
        throw new Error(notSupported_1.notSupported('stress').message);
    };
    /**
     * this ⟼ a * b = a · b + a ^ b
     *
     * Sets this Geometric2 to the geometric product, a * b, of the vector arguments.
     */
    Geometric2.prototype.versor = function (a, b) {
        var ax = a.x;
        var ay = a.y;
        var bx = b.x;
        var by = b.y;
        this.a = dotVectorE2_1.dotVectorE2(a, b);
        this.x = 0;
        this.y = 0;
        this.b = wedgeXY_1.wedgeXY(ax, ay, 0, bx, by, 0);
        return this;
    };
    /**
     * this ⟼ this * ~this
     */
    Geometric2.prototype.squaredNorm = function () {
        this.a = this.magnitude();
        this.x = 0;
        this.y = 0;
        this.b = 0;
        return this;
    };
    /**
     * @returns the square of the <code>magnitude</code> of <code>this</code>.
     */
    Geometric2.prototype.quaditude = function () {
        var a = this.a;
        var x = this.x;
        var y = this.y;
        var b = this.b;
        return a * a + x * x + y * y + b * b;
    };
    /**
     * this ⟼ this - M * α
     */
    Geometric2.prototype.sub = function (M, α) {
        if (α === void 0) { α = 1; }
        mustBeObject_1.mustBeObject('M', M);
        mustBeNumber_1.mustBeNumber('α', α);
        this.a -= M.a * α;
        this.x -= M.x * α;
        this.y -= M.y * α;
        this.b -= M.b * α;
        return this;
    };
    /**
     * this ⟼ a - b
     */
    Geometric2.prototype.sub2 = function (a, b) {
        mustBeObject_1.mustBeObject('a', a);
        mustBeObject_1.mustBeObject('b', b);
        this.a = a.a - b.a;
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        this.b = a.b - b.b;
        return this;
    };
    /**
     *
     */
    Geometric2.prototype.toArray = function () {
        return coordinates(this);
    };
    /**
     * Returns a representation of this multivector in exponential notation.
     */
    Geometric2.prototype.toExponential = function (fractionDigits) {
        var coordToString = function (coord) { return coord.toExponential(fractionDigits); };
        return stringFromCoordinates_1.stringFromCoordinates(coordinates(this), coordToString, Geometric2.BASIS_LABELS);
    };
    /**
     * Returns a representation of this multivector in fixed-point notation.
     */
    Geometric2.prototype.toFixed = function (fractionDigits) {
        var coordToString = function (coord) { return coord.toFixed(fractionDigits); };
        return stringFromCoordinates_1.stringFromCoordinates(coordinates(this), coordToString, Geometric2.BASIS_LABELS);
    };
    /**
     * Returns a representation of this multivector in exponential or fixed-point notation.
     */
    Geometric2.prototype.toPrecision = function (precision) {
        var coordToString = function (coord) { return coord.toPrecision(precision); };
        return stringFromCoordinates_1.stringFromCoordinates(coordinates(this), coordToString, Geometric2.BASIS_LABELS);
    };
    /**
     * Returns a representation of this multivector.
     */
    Geometric2.prototype.toString = function (radix) {
        var coordToString = function (coord) { return coord.toString(radix); };
        return stringFromCoordinates_1.stringFromCoordinates(coordinates(this), coordToString, Geometric2.BASIS_LABELS);
    };
    /**
     * Extraction of grade <em>i</em>.
     *
     * If this multivector is mutable (unlocked) then it is set to the result.
     *
     * @param i The index of the grade to be extracted.
     */
    Geometric2.prototype.grade = function (i) {
        if (this.isLocked()) {
            return Lockable_1.lock(this.clone().grade(i));
        }
        mustBeInteger_1.mustBeInteger('i', i);
        switch (i) {
            case 0: {
                this.x = 0;
                this.y = 0;
                this.b = 0;
                break;
            }
            case 1: {
                this.a = 0;
                this.b = 0;
                break;
            }
            case 2: {
                this.a = 0;
                this.x = 0;
                this.y = 0;
                break;
            }
            default: {
                this.a = 0;
                this.x = 0;
                this.y = 0;
                this.b = 0;
            }
        }
        return this;
    };
    /**
     * Sets this multivector to the identity element for addition, 0.
     *
     * this ⟼ 0
     */
    Geometric2.prototype.zero = function () {
        this.a = 0;
        this.x = 0;
        this.y = 0;
        this.b = 0;
        return this;
    };
    /**
     * Implements this + rhs as addition.
     * The returned value is locked.
     */
    Geometric2.prototype.__add__ = function (rhs) {
        if (rhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(this).add(rhs));
        }
        else if (typeof rhs === 'number') {
            // Addition commutes, but addScalar might be useful.
            return Lockable_1.lock(Geometric2.scalar(rhs).add(this));
        }
        else {
            var rhsCopy = duckCopy(rhs);
            if (rhsCopy) {
                // rhs is a copy and addition commutes.
                return Lockable_1.lock(rhsCopy.add(this));
            }
            else {
                return void 0;
            }
        }
    };
    /**
     *
     */
    Geometric2.prototype.__div__ = function (rhs) {
        if (rhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(this).div(rhs));
        }
        else if (typeof rhs === 'number') {
            return Lockable_1.lock(Geometric2.copy(this).divByScalar(rhs));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__rdiv__ = function (lhs) {
        if (lhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(lhs).div(this));
        }
        else if (typeof lhs === 'number') {
            return Lockable_1.lock(Geometric2.scalar(lhs).div(this));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__mul__ = function (rhs) {
        if (rhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(this).mul(rhs));
        }
        else if (typeof rhs === 'number') {
            return Lockable_1.lock(Geometric2.copy(this).scale(rhs));
        }
        else {
            var rhsCopy = duckCopy(rhs);
            if (rhsCopy) {
                // rhsCopy is a copy but multiplication does not commute.
                // If we had rmul then we could mutate the rhs!
                return this.__mul__(rhsCopy);
            }
            else {
                return void 0;
            }
        }
    };
    /**
     *
     */
    Geometric2.prototype.__rmul__ = function (lhs) {
        if (lhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(lhs).mul(this));
        }
        else if (typeof lhs === 'number') {
            return Lockable_1.lock(Geometric2.copy(this).scale(lhs));
        }
        else {
            var lhsCopy = duckCopy(lhs);
            if (lhsCopy) {
                // lhs is a copy, so we can mutate it, and use it on the left.
                return Lockable_1.lock(lhsCopy.mul(this));
            }
            else {
                return void 0;
            }
        }
    };
    /**
     *
     */
    Geometric2.prototype.__radd__ = function (lhs) {
        if (lhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(lhs).add(this));
        }
        else if (typeof lhs === 'number') {
            return Lockable_1.lock(Geometric2.scalar(lhs).add(this));
        }
        else {
            var lhsCopy = duckCopy(lhs);
            if (lhsCopy) {
                // lhs is a copy, so we can mutate it.
                return Lockable_1.lock(lhsCopy.add(this));
            }
            else {
                return void 0;
            }
        }
    };
    /**
     *
     */
    Geometric2.prototype.__sub__ = function (rhs) {
        if (rhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(this).sub(rhs));
        }
        else if (typeof rhs === 'number') {
            return Lockable_1.lock(Geometric2.scalar(-rhs).add(this));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__rsub__ = function (lhs) {
        if (lhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(lhs).sub(this));
        }
        else if (typeof lhs === 'number') {
            return Lockable_1.lock(Geometric2.scalar(lhs).sub(this));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__wedge__ = function (rhs) {
        if (rhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(this).ext(rhs));
        }
        else if (typeof rhs === 'number') {
            // The outer product with a scalar is simply scalar multiplication.
            return Lockable_1.lock(Geometric2.copy(this).scale(rhs));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__rwedge__ = function (lhs) {
        if (lhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(lhs).ext(this));
        }
        else if (typeof lhs === 'number') {
            // The outer product with a scalar is simply scalar multiplication, and commutes.
            return Lockable_1.lock(Geometric2.copy(this).scale(lhs));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__lshift__ = function (rhs) {
        if (rhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(this).lco(rhs));
        }
        else if (typeof rhs === 'number') {
            return Lockable_1.lock(Geometric2.copy(this).lco(Geometric2.scalar(rhs)));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__rlshift__ = function (lhs) {
        if (lhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(lhs).lco(this));
        }
        else if (typeof lhs === 'number') {
            return Lockable_1.lock(Geometric2.scalar(lhs).lco(this));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__rshift__ = function (rhs) {
        if (rhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(this).rco(rhs));
        }
        else if (typeof rhs === 'number') {
            return Lockable_1.lock(Geometric2.copy(this).rco(Geometric2.scalar(rhs)));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__rrshift__ = function (lhs) {
        if (lhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(lhs).rco(this));
        }
        else if (typeof lhs === 'number') {
            return Lockable_1.lock(Geometric2.scalar(lhs).rco(this));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__vbar__ = function (rhs) {
        if (rhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(this).scp(rhs));
        }
        else if (typeof rhs === 'number') {
            return Lockable_1.lock(Geometric2.copy(this).scp(Geometric2.scalar(rhs)));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__rvbar__ = function (lhs) {
        if (lhs instanceof Geometric2) {
            return Lockable_1.lock(Geometric2.copy(lhs).scp(this));
        }
        else if (typeof lhs === 'number') {
            return Lockable_1.lock(Geometric2.scalar(lhs).scp(this));
        }
        else {
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.prototype.__bang__ = function () {
        return Lockable_1.lock(Geometric2.copy(this).inv());
    };
    /**
     *
     */
    Geometric2.prototype.__tilde__ = function () {
        return Lockable_1.lock(Geometric2.copy(this).rev());
    };
    /**
     *
     */
    Geometric2.prototype.__pos__ = function () {
        // It's important that we make a copy whenever using operators.
        return Lockable_1.lock(Geometric2.copy(this));
    };
    /**
     *
     */
    Geometric2.prototype.__neg__ = function () {
        return Lockable_1.lock(Geometric2.copy(this).neg());
    };
    /**
     *
     */
    Geometric2.copy = function (M) {
        return new Geometric2([M.a, M.x, M.y, M.b]);
    };
    /**
     * Constructs the basis vector e1.
     * Locking the vector prevents mutation.
     */
    Geometric2.e1 = function (lock) {
        if (lock === void 0) { lock = false; }
        return lock ? Geometric2.E1 : Geometric2.vector(1, 0);
    };
    /**
     * Constructs the basis vector e2.
     * Locking the vector prevents mutation.
     */
    Geometric2.e2 = function (lock) {
        if (lock === void 0) { lock = false; }
        return lock ? Geometric2.E2 : Geometric2.vector(0, 1);
    };
    /**
     *
     */
    Geometric2.fromCartesian = function (a, x, y, b) {
        return new Geometric2([a, x, y, b]);
    };
    Geometric2.fromBivector = function (B) {
        return Geometric2.fromCartesian(0, 0, 0, B.b);
    };
    /**
     *
     */
    Geometric2.fromSpinor = function (spinor) {
        return new Geometric2([spinor.a, 0, 0, spinor.b]);
    };
    /**
     *
     */
    Geometric2.fromVector = function (v) {
        if (isDefined_1.isDefined(v)) {
            return new Geometric2([0, v.x, v.y, 0]);
        }
        else {
            // We could also return an undefined value here!
            return void 0;
        }
    };
    /**
     *
     */
    Geometric2.I = function (lock) {
        if (lock === void 0) { lock = false; }
        return lock ? Geometric2.PSEUDO : Geometric2.pseudo(1);
    };
    /**
     * A + α * (B - A)
     */
    Geometric2.lerp = function (A, B, α) {
        return Geometric2.copy(A).lerp(B, α);
        // return Geometric2.copy(B).sub(A).scale(α).add(A)
    };
    /**
     *
     */
    Geometric2.one = function (lock) {
        if (lock === void 0) { lock = false; }
        return lock ? Geometric2.ONE : Geometric2.scalar(1);
    };
    /**
     * Computes the rotor that rotates vector a to vector b.
     */
    Geometric2.rotorFromDirections = function (a, b) {
        return new Geometric2().rotorFromDirections(a, b);
    };
    /**
     *
     */
    Geometric2.pseudo = function (β) {
        return Geometric2.fromCartesian(0, 0, 0, β);
    };
    /**
     *
     */
    Geometric2.scalar = function (α) {
        return Geometric2.fromCartesian(α, 0, 0, 0);
    };
    /**
     *
     */
    Geometric2.vector = function (x, y) {
        return Geometric2.fromCartesian(0, x, y, 0);
    };
    /**
     *
     */
    Geometric2.zero = function (lock) {
        if (lock === void 0) { lock = false; }
        return lock ? Geometric2.ZERO : new Geometric2(zero());
    };
    /**
     *
     */
    Geometric2.BASIS_LABELS = STANDARD_LABELS;
    /**
     *
     */
    Geometric2.BASIS_LABELS_COMPASS = COMPASS_LABELS;
    /**
     *
     */
    Geometric2.BASIS_LABELS_GEOMETRIC = ARROW_LABELS;
    /**
     *
     */
    Geometric2.BASIS_LABELS_STANDARD = STANDARD_LABELS;
    /**
     * The basis element corresponding to the vector `x` coordinate.
     * The multivector is locked (immutable), but may be cloned.
     */
    Geometric2.E1 = new Geometric2(vector(1, 0));
    /**
     * The basis element corresponding to the vector `y` coordinate.
     * The multivector is locked (immutable), but may be cloned.
     */
    Geometric2.E2 = new Geometric2(vector(0, 1));
    /**
     * The identity element for addition, `0`.
     * The multivector is locked.
     */
    Geometric2.PSEUDO = new Geometric2(pseudo(1));
    /**
     * The identity element for multiplication, `1`.
     * The multivector is locked (immutable), but may be cloned.
     */
    Geometric2.ONE = new Geometric2(scalar(1));
    /**
     * The identity element for addition, `0`.
     * The multivector is locked.
     */
    Geometric2.ZERO = new Geometric2(scalar(0));
    return Geometric2;
}());
exports.Geometric2 = Geometric2;
applyMixins_1.applyMixins(Geometric2, [Lockable_2.LockableMixin]);
Geometric2.E1.lock();
Geometric2.E2.lock();
Geometric2.ONE.lock();
Geometric2.PSEUDO.lock();
Geometric2.ZERO.lock();
