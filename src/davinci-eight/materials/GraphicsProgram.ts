import AttribLocation = require('../core/AttribLocation')
import IContextProvider = require('../core/IContextProvider')
import IContextMonitor = require('../core/IContextMonitor')
import core = require('../core')
import isDefined = require('../checks/isDefined')
import isUndefined = require('../checks/isUndefined')
import MonitorList = require('../scene/MonitorList')
import IGraphicsProgram = require('../core/IGraphicsProgram')
import R1 = require('../math/R1')
import Matrix2 = require('../math/Matrix2')
import Matrix3 = require('../math/Matrix3')
import Matrix4 = require('../math/Matrix4')
import mustBeInteger = require('../checks/mustBeInteger')
import mustBeString = require('../checks/mustBeString')
import refChange = require('../utils/refChange')
import Shareable = require('../utils/Shareable')
import UniformLocation = require('../core/UniformLocation')
import uuid4 = require('../utils/uuid4')
import VectorE2 = require('../math/VectorE2')
import VectorE3 = require('../math/VectorE3')
import VectorE4 = require('../math/VectorE4')

function consoleWarnDroppedUniform(clazz: string, suffix: string, name: string, canvasId: number) {
    console.warn(clazz + " dropped uniform" + suffix + " " + name)
    console.warn("`typeof canvasId` is " + typeof canvasId)
}

/**
 * @class GraphicsProgram
 * @extends Shareable
 */
class GraphicsProgram extends Shareable implements IGraphicsProgram {
    /**
     * @property inner
     * @type {IGraphicsProgram}
     * @private
     */
    private inner: IGraphicsProgram;
    private readyPending: boolean = false;
    private _monitors: MonitorList;
    /**
     * The name used for logging and assigned in the constructor.
     * @property type
     * @type {string}
     * @private
     */
    private type: string;

    /**
     * A GraphicsProgram instance contains one WebGLProgram for each context/canvas that it is associated with.
     * @class GraphicsProgram
     * @constructor
     * @param contexts {IContextMonitor[]} An array of context monitors, one for each HTML canvas you are using.
     * The GraphicsProgram will lazily register itself (call addContextListener) with each context in order to be notified of context loss events.
     * The GraphicsProgram will automatically unregister itself (call removeContextListener) prior to destruction.
     * @param type {string} The class name, used for logging.
     */
    constructor(contexts: IContextMonitor[], type: string) {
        super('GraphicsProgram')
        MonitorList.verify('contexts', contexts)
        mustBeString('type', type)
        this._monitors = MonitorList.copy(contexts)
        this.type = type
    }

    /**
     * @method destructor
     * @return {void}
     * @protected
     */
    protected destructor(): void {
        this._monitors.removeContextListener(this)
        this._monitors.release()
        this._monitors = void 0
        if (this.inner) {
            this.inner.release()
            this.inner = void 0
        }
    }

    /**
     * Registers this GraphicsProgram with the context monitors and synchronizes the WebGL contexts.
     * This causes this GraphicsProgram instance to receive a contextGain call allowing WebGLProgram initialization.
     * @method makeReady
     * @param async {boolean} Reserved for future use.
     * @protected
     */
    protected makeReady(async: boolean): void {
        if (!this.readyPending) {
            this.readyPending = true
            this._monitors.addContextListener(this)
            this._monitors.synchronize(this)
        }
    }

    /**
     * Returns the context monitors this GraphicsProgram is associated with.
     * @property monitors
     * @type {IContextMonitor[]}
     */
    get monitors(): IContextMonitor[] {
        return this._monitors.toArray()
    }

    /**
     * Returns the generated fragment shader code as a string.
     * @property fragmentShader
     * @type {string}
     */
    get fragmentShader(): string {
        if (this.inner) {
            return this.inner.fragmentShader
        }
        else {
            let async = false
            this.makeReady(async)
            if (this.inner) {
                return this.inner.fragmentShader
            }
            else {
                return void 0
            }
        }
    }

    /**
     * Makes the WebGLProgram associated with the specified canvas the current program for WebGL.
     * @method use
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    use(canvasId?: number): void {
        if (this.inner) {
            return this.inner.use(canvasId)
        }
        else {
            let async = false
            this.makeReady(async)
            if (this.inner) {
                return this.inner.use(canvasId)
            }
            else {
                if (core.verbose) {
                    console.warn(this.type + " is not ready for use. Maybe did not receive contextGain?")
                }
            }
        }
    }

    /**
     * Returns a map of GLSL attribute name to <code>AttribLocation</code>.
     * @method attributes
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {{[name: string]: AttribLocation}}
     */
    attributes(canvasId?: number): { [name: string]: AttribLocation } {
        // FIXME: Why is this called?
        // FIXME: The map should be protected but that is slow
        // FIXME Clear need for performant solution.
        if (this.inner) {
            return this.inner.attributes(canvasId)
        }
        else {
            let async = false
            this.makeReady(async)
            if (this.inner) {
                return this.inner.attributes(canvasId)
            }
            else {
                return void 0
            }
        }
    }

    /**
     * @method uniforms
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {{[name: string]: UniformLocation}}
     */
    uniforms(canvasId?: number): { [name: string]: UniformLocation } {
        if (this.inner) {
            return this.inner.uniforms(canvasId)
        }
        else {
            let async = false
            this.makeReady(async)
            if (this.inner) {
                return this.inner.uniforms(canvasId)
            }
            else {
                return void 0
            }
        }
    }

    /**
     * @method enableAttrib
     * @param name {string}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    enableAttrib(name: string, canvasId?: number): void {
        if (this.inner) {
            return this.inner.enableAttrib(name, canvasId)
        }
        else {
            let async = false
            this.makeReady(async)
            if (this.inner) {
                return this.inner.enableAttrib(name, canvasId)
            }
            else {
                console.warn(this.type + " enableAttrib()")
            }
        }
    }

    /**
     * @method disableAttrib
     * @param name {string}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    disableAttrib(name: string, canvasId?: number) {
        if (this.inner) {
            return this.inner.disableAttrib(name, canvasId)
        }
        else {
            let async = false
            this.makeReady(async)
            if (this.inner) {
                return this.inner.disableAttrib(name, canvasId)
            }
            else {
                console.warn(this.type + " disableAttrib()")
            }
        }
    }

    /**
     * @method contextFree
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    contextFree(canvasId?: number): void {
        if (this.inner) {
            this.inner.contextFree(canvasId)
        }
    }

    /**
     * @method contextGain
     * @param manager {IContextProvider}
     * @return {void}
     */
    contextGain(manager: IContextProvider) {
        if (isUndefined(this.inner)) {
            this.inner = this.createGraphicsProgram()
        }
        if (isDefined(this.inner)) {
            this.inner.contextGain(manager)
        }
    }

    /**
     * @method contextLost
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    contextLost(canvasId?: number) {
        if (this.inner) {
            this.inner.contextLost(canvasId)
        }
    }

    /**
     * @method createGraphicsProgram
     * @return {IGraphicsProgram}
     * @protected
     */
    protected createGraphicsProgram(): IGraphicsProgram {
        // FIXME Since we get contextGain by canvas, expect canvasId to be an argument?
        throw new Error("GraphicsProgram createGraphicsProgram method is virtual and should be implemented by " + this.type)
    }

    /**
     * @method uniform1f
     * @param name {string}
     * @param x {number}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniform1f(name: string, x: number, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniform1f(name, x, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniform1f(name, x, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, '1f', name, canvasId)
                }
            }
        }
    }

    /**
     * @method uniform2f
     * @param name {string}
     * @param x {number}
     * @param y {number}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniform2f(name: string, x: number, y: number, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniform2f(name, x, y, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniform2f(name, x, y, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, '2f', name, canvasId)
                }
            }
        }
    }

    /**
     * @method uniform3f
     * @param name {string}
     * @param x {number}
     * @param y {number}
     * @param z {number}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniform3f(name: string, x: number, y: number, z: number, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniform3f(name, x, y, z, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniform3f(name, x, y, z, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, '3f', name, canvasId)
                }
            }
        }
    }

    /**
     * @method uniform4f
     * @param name {string}
     * @param x {number}
     * @param y {number}
     * @param z {number}
     * @param w {number}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniform4f(name: string, x: number, y: number, z: number, w: number, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniform4f(name, x, y, z, w, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniform4f(name, x, y, z, w, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, '4f', name, canvasId)
                }
            }
        }
    }

    /**
     * @method uniformMatrix2
     * @param name {string}
     * @param transpose {boolean}
     * @param matrix {Matrix2}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniformMatrix2(name: string, transpose: boolean, matrix: Matrix2, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniformMatrix2(name, transpose, matrix, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniformMatrix2(name, transpose, matrix, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, 'Matrix2', name, canvasId)
                }
            }
        }
    }

    /**
     * @method uniformMatrix3
     * @param name {string}
     * @param transpose {boolean}
     * @param matrix {Matrix3}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniformMatrix3(name: string, transpose: boolean, matrix: Matrix3, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniformMatrix3(name, transpose, matrix, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniformMatrix3(name, transpose, matrix, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, 'Matrix3', name, canvasId)
                }
            }
        }
    }

    /**
     * @method uniformMatrix4
     * @param name {string}
     * @param transpose {boolean}
     * @param matrix {Matrix4}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniformMatrix4(name: string, transpose: boolean, matrix: Matrix4, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniformMatrix4(name, transpose, matrix, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniformMatrix4(name, transpose, matrix, canvasId)
            }
            else {
                if (!readyPending) {
                    if (core.verbose) {
                        consoleWarnDroppedUniform(this.type, 'Matrix4', name, canvasId)
                    }
                }
            }
        }
    }

    /**
     * @method uniformVectorE2
     * @param name {string}
     * @param vector {VectorE2}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniformVectorE2(name: string, vector: VectorE2, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniformVectorE2(name, vector, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniformVectorE2(name, vector, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, 'R2', name, canvasId)
                }
            }
        }
    }

    /**
     * @method uniformVectorE3
     * @param name {string}
     * @param vector {VectorE3}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniformVectorE3(name: string, vector: VectorE3, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniformVectorE3(name, vector, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniformVectorE3(name, vector, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, 'R3', name, canvasId)
                }
            }
        }
    }

    /**
     * @method uniformVectorE4
     * @param name {string}
     * @param vector {VectorE4}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    uniformVectorE4(name: string, vector: VectorE4, canvasId?: number): void {
        if (this.inner) {
            this.inner.uniformVectorE4(name, vector, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.uniformVectorE4(name, vector, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, 'R4', name, canvasId)
                }
            }
        }
    }

    /**
     * @method vector2
     * @param name {string}
     * @param data {number[]}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    vector2(name: string, data: number[], canvasId?: number): void {
        if (this.inner) {
            this.inner.vector2(name, data, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.vector2(name, data, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, 'vector2', name, canvasId)
                }
            }
        }
    }

    /**
     * @method vector3
     * @param name {string}
     * @param data {number[]}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    vector3(name: string, data: number[], canvasId?: number): void {
        if (this.inner) {
            this.inner.vector3(name, data, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.vector3(name, data, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, 'vector3', name, canvasId)
                }
            }
        }
    }

    /**
     * @method vector4
     * @param name {string}
     * @param data {number[]}
     * @param [canvasId] {number} Determines which WebGLProgram to use.
     * @return {void}
     */
    vector4(name: string, data: number[], canvasId?: number): void {
        if (this.inner) {
            this.inner.vector4(name, data, canvasId)
        }
        else {
            let async = false
            let readyPending = this.readyPending
            this.makeReady(async)
            if (this.inner) {
                this.inner.vector4(name, data, canvasId)
            }
            else {
                if (!readyPending) {
                    consoleWarnDroppedUniform(this.type, 'vector4', name, canvasId)
                }
            }
        }
    }

    /**
     * Returns the generated shader vertex code as a string.
     * @property vertexShader
     * @type {string}
     */
    get vertexShader(): string {
        if (this.inner) {
            return this.inner.vertexShader
        }
        else {
            let async = false
            this.makeReady(async)
            if (this.inner) {
                return this.inner.vertexShader
            }
            else {
                return void 0
            }
        }
    }
}

export = GraphicsProgram