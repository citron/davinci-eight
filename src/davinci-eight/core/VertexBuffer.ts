import ContextProvider from './ContextProvider';
import DataBuffer from './DataBuffer';
import {Engine} from './Engine';
import mustBeObject from '../checks/mustBeObject';
import mustBeUndefined from '../checks/mustBeUndefined';
import {ShareableContextConsumer} from './ShareableContextConsumer';
import {checkUsage} from './Usage';
import Usage from './Usage';
import usageToGL from './usageToGL';

/**
 * <p>
 * A wrapper around a WebGLBuffer with binding to ARRAY_BUFFER.
 * </p>
 *
 * @class VertexBuffer
 * @extends ShareableContextConsumer
 */
export default class VertexBuffer extends ShareableContextConsumer implements DataBuffer<Float32Array> {

    /**
     * @property webGLBuffer
     * @type WebGLBuffer
     * @private
     */
    private webGLBuffer: WebGLBuffer;

    /**
     * @property _data
     * @type Float32Array
     * @private
     */
    private _data: Float32Array;

    public _usage = Usage.STATIC_DRAW;

    /**
     * @class VertexBuffer
     * @constructor
     * @param engine {Engine}
     */
    constructor(engine: Engine) {
        super(engine)
        this.setLoggingName('VertexBuffer')
        this.synchUp()
    }

    /**
     * @method destructor
     * @param levelUp {number}
     * @return {void}
     * @protected
     */
    protected destructor(levelUp: number): void {
        this.cleanUp()
        mustBeUndefined(this._type, this.webGLBuffer)
        super.destructor(levelUp + 1)
    }

    /**
     * @property data
     * @type Float32Array
     */
    get data(): Float32Array {
        return this._data
    }
    set data(data: Float32Array) {
        // TODO: If the buffer is bound and data is set, should we re-bind?
        // But how do we know that we haven't been unbound?
        // Centralizing in the contextProvider might help?
        this._data = data;
        this.bufferData();
    }

    get usage(): Usage {
        return this._usage;
    }
    set usage(usage: Usage) {
        checkUsage('usage', usage);
        this._usage = usage;
        this.bufferData();
    }

    bufferData(): void {
        if (this.contextProvider) {
            const gl = this.contextProvider.gl
            if (gl) {
                if (this.webGLBuffer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, this.webGLBuffer)
                    if (this._data) {
                        gl.bufferData(gl.ARRAY_BUFFER, this._data, usageToGL(this.usage, gl));
                    }
                    gl.bindBuffer(gl.ARRAY_BUFFER, null)
                }
            }
        }
    }

    /**
     * @method contextFree
     * @param contextProvider {ContextProvider}
     * @return {void}
     */
    contextFree(contextProvider: ContextProvider): void {
        mustBeObject('contextProvider', contextProvider)
        if (this.webGLBuffer) {
            const gl = contextProvider.gl
            if (gl) {
                gl.deleteBuffer(this.webGLBuffer)
            }
            else {
                console.error(`${this._type} must leak WebGLBuffer because WebGLRenderingContext is ` + typeof gl)
            }
            this.webGLBuffer = void 0
        }
        else {
            // It's a duplicate, ignore.
        }
        super.contextFree(contextProvider)
    }

    /**
     * @method contextGain
     * @param contextProvider {ContextProvider}
     * @return {void}
     */
    contextGain(contextProvider: ContextProvider): void {
        super.contextGain(contextProvider)
        mustBeObject('contextProvider', contextProvider)
        const gl = contextProvider.gl
        if (!this.webGLBuffer) {
            this.webGLBuffer = gl.createBuffer();
            this.bufferData();
        }
        else {
            // It's a duplicate, ignore the call.
        }
    }

    /**
     * @method contextLost
     * @return {void}
     */
    contextLost(): void {
        this.webGLBuffer = void 0
        super.contextLost()
    }

    bind(): void {
        const gl = this.gl;
        if (gl) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.webGLBuffer);
        }
    }

    unbind() {
        const gl = this.gl;
        if (gl) {
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }
    }
}
