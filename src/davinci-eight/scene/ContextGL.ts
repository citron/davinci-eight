import Capability = require('../commands/Capability')
import createRenderer = require('../renderers/renderer')
import ContextController = require('../core/ContextController')
import ContextKahuna = require('../core/ContextKahuna')
import IContextProvider = require('../core/IContextProvider')
import IContextMonitor = require('../core/IContextMonitor')
import IContextConsumer = require('../core/IContextConsumer')
import contextProxy = require('../utils/contextProxy')
import IContextRenderer = require('../renderers/IContextRenderer')
import core = require('../core')
import DrawPrimitive = require('../geometries/DrawPrimitive')
import IBuffer = require('../core/IBuffer')
import IContextCommand = require('../core/IContextCommand')
import IDrawList = require('../scene/IDrawList')
import IBufferGeometry = require('../geometries/IBufferGeometry')
import ITexture2D = require('../core/ITexture2D')
import ITextureCubeMap = require('../core/ITextureCubeMap')
import IUnknown = require('../core/IUnknown')
import IUnknownArray = require('../collections/IUnknownArray')
import mustBeDefined = require('../checks/mustBeDefined')
import mustBeFunction = require('../checks/mustBeFunction')
import mustBeInteger = require('../checks/mustBeInteger')
import mustSatisfy = require('../checks/mustSatisfy')
import readOnly = require('../i18n/readOnly')
import Scene = require('../scene/Scene')
import Shareable = require('../utils/Shareable')
import IFacet = require('../core/IFacet')

function beHTMLCanvasElement(): string {
    return "be an HTMLCanvasElement"
}

let defaultCanvasBuilder = () => { return document.createElement('canvas') }

/**
 * @class ContextGL
 */
class ContextGL extends Shareable implements ContextController, IContextProvider, IContextMonitor, IContextRenderer {
    /**
     * @property _kahuna
     * @type {ContextKahuna}
     * @private
     */
    private _kahuna: ContextKahuna;

    /**
     * @property _renderer
     * @type {IContextRenderer}
     * @private
     */
    private _renderer: IContextRenderer;

    /**
     * @class ContextGL
     * @constructor
     * @param [attributes] {WebGLContextAttributes} Allow the context to be configured.
     * @beta
     */
    // FIXME: Move attributes to start()
    constructor(attributes?: WebGLContextAttributes) {
        super('ContextGL')
        this._kahuna = contextProxy(attributes)
        this._renderer = createRenderer()
        this._kahuna.addContextListener(this._renderer)
        this._kahuna.synchronize(this._renderer)
    }

    /**
     * @method destructor
     * return {void}
     * @protected
     */
    protected destructor(): void {
        this._kahuna.removeContextListener(this._renderer)
        this._kahuna.release()
        this._kahuna = void 0
        this._renderer.release()
        this._renderer = void 0
        super.destructor()
    }

    /**
     * @method addContextListener
     * @param user {IContextConsumer}
     * @return {void}
     */
    addContextListener(user: IContextConsumer): void {
        this._kahuna.addContextListener(user)
    }

    /**
     * @property canvas
     * @type {HTMLCanvasElement}
     */
    get canvas(): HTMLCanvasElement {
        return this._kahuna.canvas;
    }
    set canvas(canvas: HTMLCanvasElement) {
        this._kahuna.canvas = canvas;
    }

    /**
     * @property canvasId
     * @type {number}
     * @readOnly
     */
    get canvasId(): number {
        return this._kahuna.canvasId;
    }
    set canvasId(unused) {
        // FIXME: DRY delegate to kahuna? Should give the same result.
        throw new Error(readOnly('canvasId').message)
    }

    /**
     * @property commands
     * @type {IUnknownArray}
     * @beta
     */
    get commands(): IUnknownArray<IContextCommand> {
        return this._renderer.commands;
    }

    /**
     * <p>
     * Specifies color values to use by the <code>clear</code> method to clear the color buffer.
     * <p>
     * @method clearColor
     * @param red {number}
     * @param green {number}
     * @param blue {number}
     * @param alpha {number}
     * @return {void}
     */
    clearColor(red: number, green: number, blue: number, alpha: number): void {
        return this._renderer.clearColor(red, green, blue, alpha)
    }

    /**
     * @method contextFree
     * @param canvasId {number}
     * @return {void}
     */
    contextFree(canvasId: number): void {
        return this._renderer.contextFree(canvasId)
    }

    /**
     * @method contextGain
     * @param manager {IContextProvider}
     * @return {void}
     */
    contextGain(manager: IContextProvider): void {
        return this._renderer.contextGain(manager)
    }

    /**
     * @method contextLost
     * @param canvasId {number}
     * @return {void}
     */
    contextLost(canvasId: number) {
        this._renderer.contextLost(canvasId)
    }

    /**
     * @method createArrayBuffer
     * @return {IBuffer}
     */
    createArrayBuffer(): IBuffer {
        return this._kahuna.createArrayBuffer()
    }

    /**
     * @method createBufferGeometry
     * @param primitive {DrawPrimitive}
     * @param [usage] {number}
     * @return {IBufferGeometry}
     */
    createBufferGeometry(primitive: DrawPrimitive, usage?: number): IBufferGeometry {
        return this._kahuna.createBufferGeometry(primitive, usage)
    }

    /**
     * @method createElementArrayBuffer
     * @return {IBuffer}
     */
    createElementArrayBuffer(): IBuffer {
        return this._kahuna.createElementArrayBuffer()
    }

    /**
     * @method createTextureCubeMap
     * @return {ITextureCubeMap}
     */
    createTextureCubeMap(): ITextureCubeMap {
        return this._kahuna.createTextureCubeMap()
    }

    /**
     * @method createTexture2D
     * @return {ITexture2D}
     */
    createTexture2D(): ITexture2D {
        return this._kahuna.createTexture2D()
    }

    /**
     * Turns off specific WebGL capabilities for this context.
     * @method disable
     * @param capability {Capability}
     * @return {void} This method does not return a value.
     */
    disable(capability: Capability): void {
        return this._renderer.disable(capability)
    }

    /**
     * Turns on specific WebGL capabilities for this context.
     * @method enable
     * @param capability {Capability}
     * @return {void} This method does not return a value.
     */
    enable(capability: Capability): void {
        return this._renderer.enable(capability)
    }

    /**
     * @property gl
     * @type {WebGLRenderingContext}
     * @readOnly
     */
    get gl(): WebGLRenderingContext {
        return this._kahuna.gl
    }

    /**
     * @method removeContextListener
     * @param user {IContextConsumer}
     * @return {void}
     */
    removeContextListener(user: IContextConsumer): void {
        return this._kahuna.removeContextListener(user)
    }

    /**
     * Defines what part of the canvas will be used in rendering the drawing buffer.
     * @method viewport
     * @param x {number}
     * @param y {number}
     * @param width {number}
     * @param height {number}
     * @return {void} This method does not return a value.
     */
    viewport(x: number, y: number, width: number, height: number): void {
        return this._renderer.viewport(x, y, width, height)
    }

    /**
     * Initializes the WebGL context for the specified <code>canvas</code>.
     * @method start
     * @param canvas {HTMLCanvasElement} The HTML canvas element.
     * @param [canvasId] {number} An optional user-defined alias for the canvas when using multi-canvas.
     * @return {void}
     */
    start(canvas: HTMLCanvasElement, canvasId?: number): void {
        // FIXME: DRY delegate to kahuna.
        if (!(canvas instanceof HTMLElement)) {
            if (core.verbose) {
                console.warn("canvas must be an HTMLCanvasElement to start the context.")
            }
            return
        }
        mustBeDefined('canvas', canvas)
        this._kahuna.start(canvas, canvasId)
    }

    /**
     * @method stop
     * @return {void}
     */
    stop(): void {
        return this._kahuna.stop()
    }

    /**
     * @method synchronize
     * @param user {IContextConsumer}
     * @return {void}
     */
    synchronize(user: IContextConsumer): void {
        return this._kahuna.synchronize(user)
    }
}

export = ContextGL