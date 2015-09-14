define(["require", "exports", '../checks/expectArg'], function (require, exports, expectArg) {
    var RefCount = (function () {
        function RefCount(callback) {
            this._refCount = 1;
            expectArg('callback', callback).toBeFunction();
            this._callback = callback;
        }
        RefCount.prototype.addRef = function () {
            this._refCount++;
            return this._refCount;
        };
        RefCount.prototype.release = function () {
            if (this._refCount > 0) {
                this._refCount--;
                if (this._refCount === 0) {
                    var callback = this._callback;
                    this._callback = void 0;
                    callback();
                }
                return this._refCount;
            }
            else {
                console.warn("release() called with refCount already " + this._refCount);
            }
        };
        return RefCount;
    })();
    return RefCount;
});