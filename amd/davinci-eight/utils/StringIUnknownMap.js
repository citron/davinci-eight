define(["require", "exports", '../utils/refChange', '../utils/uuid4'], function (require, exports, refChange, uuid4) {
    var LOGGING_NAME_IUNKNOWN_MAP = 'StringIUnknownMap';
    var StringIUnknownMap = (function () {
        /**
         * <p>
         * A map&lt;V&gt; of <code>string</code> to <code>V extends IUnknown</code>.
         * </p>
         * @class StringIUnknownMap
         * @constructor
         */
        function StringIUnknownMap() {
            this._refCount = 1;
            this._elements = {};
            this._uuid = uuid4().generate();
            refChange(this._uuid, LOGGING_NAME_IUNKNOWN_MAP, +1);
        }
        StringIUnknownMap.prototype.addRef = function () {
            refChange(this._uuid, LOGGING_NAME_IUNKNOWN_MAP, +1);
            this._refCount++;
            return this._refCount;
        };
        StringIUnknownMap.prototype.release = function () {
            refChange(this._uuid, LOGGING_NAME_IUNKNOWN_MAP, -1);
            this._refCount--;
            if (this._refCount === 0) {
                var self_1 = this;
                this.forEach(function (key) {
                    self_1.putWeakReference(key, void 0);
                });
                this._elements = void 0;
            }
            return this._refCount;
        };
        /**
         * Determines whether the key exists in the map with a defined value.
         * @method exists
         * @param key {string}
         * @return {boolean} <p><code>true</code> if there is an element at the specified key.</p>
         */
        StringIUnknownMap.prototype.exists = function (key) {
            var element = this._elements[key];
            return element ? true : false;
        };
        StringIUnknownMap.prototype.getStrongReference = function (key) {
            var element = this._elements[key];
            if (element) {
                element.addRef();
                return element;
            }
            else {
                return void 0;
            }
        };
        StringIUnknownMap.prototype.getWeakReference = function (key) {
            var element = this._elements[key];
            if (element) {
                return element;
            }
            else {
                return void 0;
            }
        };
        StringIUnknownMap.prototype.putStrongReference = function (key, value) {
            if (value) {
                value.addRef();
            }
            this.putWeakReference(key, value);
        };
        StringIUnknownMap.prototype.putWeakReference = function (key, value) {
            var elements = this._elements;
            var existing = elements[key];
            if (existing) {
                existing.release();
            }
            elements[key] = value;
        };
        StringIUnknownMap.prototype.forEach = function (callback) {
            var keys = this.keys;
            var i;
            var length = keys.length;
            for (i = 0; i < length; i++) {
                var key = keys[i];
                var value = this._elements[key];
                callback(key, value);
            }
        };
        Object.defineProperty(StringIUnknownMap.prototype, "keys", {
            get: function () {
                // TODO: memoize
                return Object.keys(this._elements);
            },
            enumerable: true,
            configurable: true
        });
        StringIUnknownMap.prototype.remove = function (key) {
            var value = this.getWeakReference(key);
            if (value) {
                value.release();
            }
            delete this._elements[key];
        };
        return StringIUnknownMap;
    })();
    return StringIUnknownMap;
});