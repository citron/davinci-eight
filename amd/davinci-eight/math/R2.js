var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../geometries/b2', '../geometries/b3', '../i18n/notImplemented', '../math/stringFromCoordinates', '../math/VectorN'], function (require, exports, b2_1, b3_1, notImplemented_1, stringFromCoordinates_1, VectorN_1) {
    var sqrt = Math.sqrt;
    var COORD_X = 0;
    var COORD_Y = 1;
    var R2 = (function (_super) {
        __extends(R2, _super);
        function R2(data, modified) {
            if (data === void 0) { data = [0, 0]; }
            if (modified === void 0) { modified = false; }
            _super.call(this, data, modified, 2);
        }
        Object.defineProperty(R2.prototype, "x", {
            get: function () {
                return this.coords[COORD_X];
            },
            set: function (value) {
                this.modified = this.modified || this.x !== value;
                this.coords[COORD_X] = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(R2.prototype, "y", {
            get: function () {
                return this.coords[COORD_Y];
            },
            set: function (value) {
                this.modified = this.modified || this.y !== value;
                this.coords[COORD_Y] = value;
            },
            enumerable: true,
            configurable: true
        });
        R2.prototype.add = function (v, α) {
            if (α === void 0) { α = 1; }
            this.x += v.x * α;
            this.y += v.y * α;
            return this;
        };
        R2.prototype.add2 = function (a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            return this;
        };
        R2.prototype.applyMatrix = function (m) {
            var x = this.x;
            var y = this.y;
            var e = m.elements;
            this.x = e[0x0] * x + e[0x2] * y;
            this.y = e[0x1] * x + e[0x3] * y;
            return this;
        };
        R2.prototype.clone = function () {
            return new R2([this.x, this.y]);
        };
        R2.prototype.copy = function (v) {
            this.x = v.x;
            this.y = v.y;
            return this;
        };
        R2.prototype.cubicBezier = function (t, controlBegin, controlEnd, endPoint) {
            var x = b3_1.default(t, this.x, controlBegin.x, controlEnd.x, endPoint.x);
            var y = b3_1.default(t, this.y, controlBegin.y, controlEnd.y, endPoint.y);
            this.x = x;
            this.y = y;
            return this;
        };
        R2.prototype.distanceTo = function (position) {
            return sqrt(this.quadranceTo(position));
        };
        R2.prototype.sub = function (v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        };
        R2.prototype.sub2 = function (a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            return this;
        };
        R2.prototype.scale = function (α) {
            this.x *= α;
            this.y *= α;
            return this;
        };
        R2.prototype.divByScalar = function (scalar) {
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
        };
        R2.prototype.min = function (v) {
            if (this.x > v.x) {
                this.x = v.x;
            }
            if (this.y > v.y) {
                this.y = v.y;
            }
            return this;
        };
        R2.prototype.max = function (v) {
            if (this.x < v.x) {
                this.x = v.x;
            }
            if (this.y < v.y) {
                this.y = v.y;
            }
            return this;
        };
        R2.prototype.floor = function () {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this;
        };
        R2.prototype.ceil = function () {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this;
        };
        R2.prototype.round = function () {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this;
        };
        R2.prototype.roundToZero = function () {
            this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
            return this;
        };
        R2.prototype.neg = function () {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        };
        R2.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y;
        };
        R2.prototype.magnitude = function () {
            return sqrt(this.squaredNorm());
        };
        R2.prototype.direction = function () {
            return this.divByScalar(this.magnitude());
        };
        R2.prototype.squaredNorm = function () {
            return this.x * this.x + this.y * this.y;
        };
        R2.prototype.quadranceTo = function (position) {
            var dx = this.x - position.x;
            var dy = this.y - position.y;
            return dx * dx + dy * dy;
        };
        R2.prototype.quadraticBezier = function (t, controlPoint, endPoint) {
            var x = b2_1.default(t, this.x, controlPoint.x, endPoint.x);
            var y = b2_1.default(t, this.y, controlPoint.y, endPoint.y);
            this.x = x;
            this.y = y;
            return this;
        };
        R2.prototype.reflect = function (n) {
            throw new Error(notImplemented_1.default('reflect').message);
        };
        R2.prototype.rotate = function (spinor) {
            var x = this.x;
            var y = this.y;
            var α = spinor.α;
            var β = spinor.β;
            var p = α * α - β * β;
            var q = 2 * α * β;
            this.x = p * x + q * y;
            this.y = p * y - q * x;
            return this;
        };
        R2.prototype.lerp = function (v, α) {
            this.x += (v.x - this.x) * α;
            this.y += (v.y - this.y) * α;
            return this;
        };
        R2.prototype.lerp2 = function (a, b, α) {
            this.copy(a).lerp(b, α);
            return this;
        };
        R2.prototype.equals = function (v) {
            return ((v.x === this.x) && (v.y === this.y));
        };
        R2.prototype.slerp = function (v, α) {
            throw new Error(notImplemented_1.default('slerp').message);
        };
        R2.prototype.toExponential = function () {
            var coordToString = function (coord) { return coord.toExponential(); };
            return stringFromCoordinates_1.default(this.coords, coordToString, ['e1', 'e2']);
        };
        R2.prototype.toFixed = function (fractionDigits) {
            var coordToString = function (coord) { return coord.toFixed(fractionDigits); };
            return stringFromCoordinates_1.default(this.coords, coordToString, ['e1', 'e2']);
        };
        R2.prototype.toString = function () {
            var coordToString = function (coord) { return coord.toString(); };
            return stringFromCoordinates_1.default(this.coords, coordToString, ['e1', 'e2']);
        };
        R2.prototype.fromArray = function (array, offset) {
            if (offset === void 0) { offset = 0; }
            this.x = array[offset];
            this.y = array[offset + 1];
            return this;
        };
        R2.prototype.fromAttribute = function (attribute, index, offset) {
            if (offset === void 0) { offset = 0; }
            index = index * attribute.itemSize + offset;
            this.x = attribute.array[index];
            this.y = attribute.array[index + 1];
            return this;
        };
        R2.prototype.zero = function () {
            this.x = 0;
            this.y = 0;
            return this;
        };
        R2.copy = function (vector) {
            return R2.vector(vector.x, vector.y);
        };
        R2.lerp = function (a, b, α) {
            return R2.copy(b).sub(a).scale(α).add(a);
        };
        R2.random = function () {
            return R2.vector(Math.random(), Math.random());
        };
        R2.vector = function (x, y) {
            return new R2([x, y]);
        };
        return R2;
    })(VectorN_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = R2;
});
