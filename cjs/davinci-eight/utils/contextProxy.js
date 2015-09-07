var initWebGL = require('../renderers/initWebGL');
var expectArg = require('../checks/expectArg');
var isDefined = require('../checks/isDefined');
var Texture = require('../resources/Texture');
function contextProxy(canvas, attributes) {
    expectArg('canvas', canvas).toSatisfy(canvas instanceof HTMLCanvasElement, "canvas argument must be an HTMLCanvasElement");
    var users = [];
    var context;
    var refCount = 1;
    var webGLContextLost = function (event) {
        event.preventDefault();
        context = void 0;
        users.forEach(function (user) {
            user.contextLoss();
        });
    };
    var webGLContextRestored = function (event) {
        event.preventDefault();
        context = initWebGL(canvas, attributes);
        users.forEach(function (user) {
            user.contextGain(context);
        });
    };
    var self = {
        start: function () {
            context = initWebGL(canvas, attributes);
            canvas.addEventListener('webglcontextlost', webGLContextLost, false);
            canvas.addEventListener('webglcontextrestored', webGLContextRestored, false);
            users.forEach(function (user) { user.contextGain(context); });
            return self;
        },
        stop: function () {
            context = void 0;
            users.forEach(function (user) { user.contextFree(); });
            canvas.removeEventListener('webglcontextrestored', webGLContextRestored, false);
            canvas.removeEventListener('webglcontextlost', webGLContextLost, false);
            return self;
        },
        addContextUser: function (user) {
            expectArg('user', user).toBeObject();
            user.addRef();
            users.push(user);
            if (context) {
                user.contextGain(context);
            }
            return self;
        },
        removeContextUser: function (user) {
            expectArg('user', user).toBeObject();
            var index = users.indexOf(user);
            if (index >= 0) {
                users.splice(index, 1);
                user.release();
            }
            return self;
        },
        get context() {
            if (isDefined(context)) {
                return context;
            }
            else {
                console.warn("property context: WebGLRenderingContext is not defined. Either context has been lost or start() not called.");
                return void 0;
            }
        },
        addRef: function () {
            refCount++;
            console.log("monitor.addRef() => " + refCount);
            return refCount;
        },
        release: function () {
            refCount--;
            console.log("monitor.release() => " + refCount);
            if (refCount === 0) {
                while (users.length > 0) {
                    users.pop().release();
                }
            }
            return refCount;
        },
        clearColor: function (red, green, blue, alpha) {
            if (context) {
                return context.clearColor(red, green, blue, alpha);
            }
        },
        clearDepth: function (depth) {
            if (context) {
                return context.clearDepth(depth);
            }
        },
        drawArrays: function (mode, first, count) {
            if (context) {
                return context.drawArrays(mode, first, count);
            }
        },
        drawElements: function (mode, count, type, offset) {
            if (context) {
                return context.drawElements(mode, count, type, offset);
            }
        },
        depthFunc: function (func) {
            if (context) {
                return context.depthFunc(func);
            }
        },
        enable: function (capability) {
            if (context) {
                return context.enable(capability);
            }
        },
        createTexture: function () {
            var texture = new Texture();
            self.addContextUser(texture);
            return texture;
        }
    };
    return self;
}
;
module.exports = contextProxy;
