define(["require", "exports", '../checks/expectArg', '../utils/refChange', '../utils/uuid4'], function (require, exports, expectArg, refChange, uuid4) {
    /**
     * Name used for reference count monitoring and logging.
     */
    var LOGGING_NAME_IBUFFER = 'IBuffer';
    function checkTarget(target) {
        return target;
    }
    // TODO: Replace this with a functional constructor to prevent tinkering.
    var BufferResource = (function () {
        function BufferResource(monitor, target) {
            this._refCount = 1;
            this._uuid = uuid4().generate();
            this._monitor = expectArg('montor', monitor).toBeObject().value;
            this._target = checkTarget(target);
            refChange(this._uuid, LOGGING_NAME_IBUFFER, +1);
            monitor.addContextListener(this);
        }
        BufferResource.prototype.destructor = function () {
            if (this._buffer) {
                this._gl.deleteBuffer(this._buffer);
                this._buffer = void 0;
            }
            this._gl = void 0;
            this._monitor.removeContextListener(this);
            this._monitor = void 0;
            this._refCount = void 0;
            this._target = void 0;
            this._uuid = void 0;
        };
        BufferResource.prototype.addRef = function () {
            this._refCount++;
            refChange(this._uuid, LOGGING_NAME_IBUFFER, +1);
            return this._refCount;
        };
        BufferResource.prototype.release = function () {
            this._refCount--;
            refChange(this._uuid, LOGGING_NAME_IBUFFER, -1);
            if (this._refCount === 0) {
                this.destructor();
                return 0;
            }
            else {
                return this._refCount;
            }
        };
        BufferResource.prototype.contextFree = function () {
            if (this._buffer) {
                this._gl.deleteBuffer(this._buffer);
                this._buffer = void 0;
            }
            this._gl = void 0;
        };
        BufferResource.prototype.contextGain = function (manager) {
            // FIXME: Support for multiple contexts. Do I need multiple buffers?
            // Remark. The constructor says I will only be working with one context.
            // However, if that is the case, what if someone adds me to a different context.
            // Answer, I can detect this condition by looking a canvasId.
            // But can I prevent it in the API?
            // I don't think so. That would require typed contexts.
            var gl = manager.gl;
            if (this._gl !== gl) {
                this.contextFree();
                this._gl = gl;
                this._buffer = gl.createBuffer();
            }
        };
        BufferResource.prototype.contextLoss = function () {
            this._buffer = void 0;
            this._gl = void 0;
        };
        /**
         * @method bind
         */
        BufferResource.prototype.bind = function () {
            if (this._gl) {
                this._gl.bindBuffer(this._target, this._buffer);
            }
            else {
                console.warn(LOGGING_NAME_IBUFFER + " bind() missing WebGL rendering context.");
            }
        };
        /**
         * @method unbind
         */
        BufferResource.prototype.unbind = function () {
            if (this._gl) {
                this._gl.bindBuffer(this._target, null);
            }
            else {
                console.warn(LOGGING_NAME_IBUFFER + " unbind() missing WebGL rendering context.");
            }
        };
        return BufferResource;
    })();
    return BufferResource;
});
