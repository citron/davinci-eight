var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../utils/Shareable'], function (require, exports, Shareable) {
    // FIXME: Maybe use a dynamic flag implying JIT keys, otherwise recompute as we go along.
    var LOGGING_NAME = 'NumberIUnknownMap';
    var NumberIUnknownMap = (function (_super) {
        __extends(NumberIUnknownMap, _super);
        function NumberIUnknownMap() {
            _super.call(this, LOGGING_NAME);
            this._elements = {};
        }
        NumberIUnknownMap.prototype.destructor = function () {
            var self = this;
            this.forEach(function (key, value) {
                if (value) {
                    value.release();
                }
            });
            this._elements = void 0;
        };
        NumberIUnknownMap.prototype.exists = function (key) {
            var element = this._elements[key];
            return element ? true : false;
        };
        NumberIUnknownMap.prototype.getStrongReference = function (key) {
            var element = this.getWeakReference(key);
            if (element) {
                element.addRef();
            }
            return element;
        };
        NumberIUnknownMap.prototype.getWeakReference = function (index) {
            return this._elements[index];
        };
        NumberIUnknownMap.prototype.putStrongReference = function (key, value) {
            if (value) {
                value.addRef();
            }
            this.putWeakReference(key, value);
        };
        NumberIUnknownMap.prototype.putWeakReference = function (key, value) {
            var elements = this._elements;
            var existing = elements[key];
            if (existing) {
                existing.release();
            }
            elements[key] = value;
        };
        NumberIUnknownMap.prototype.forEach = function (callback) {
            var keys = this.keys;
            var i;
            var length = keys.length;
            for (i = 0; i < length; i++) {
                var key = keys[i];
                var value = this._elements[key];
                callback(key, value);
            }
        };
        Object.defineProperty(NumberIUnknownMap.prototype, "keys", {
            get: function () {
                // FIXME: cache? Maybe, clients may use this to iterate. forEach is too slow.
                return Object.keys(this._elements).map(function (keyString) { return parseFloat(keyString); });
            },
            enumerable: true,
            configurable: true
        });
        NumberIUnknownMap.prototype.remove = function (key) {
            // Strong or Weak doesn't matter because the value is `undefined`.
            this.putStrongReference(key, void 0);
            delete this._elements[key];
        };
        return NumberIUnknownMap;
    })(Shareable);
    return NumberIUnknownMap;
});
