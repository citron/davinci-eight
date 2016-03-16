// import Attribute from './Attribute'
import Capability from '../commands/Capability';
import config from '../config'
import EIGHTLogger from '../commands/EIGHTLogger';
import ErrorMode from './ErrorMode'
// import computeAttributes from './computeAttributes'
// import computeCount from './computeCount'
// import computePointers from './computePointers'
// import computeStride from './computeStride'
import ContextConsumer from './ContextConsumer';
import DefaultContextProvider from '../base/DefaultContextProvider';
import incLevel from '../base/incLevel';
import initWebGL from './initWebGL';
import isDefined from '../checks/isDefined';
import mustBeBoolean from '../checks/mustBeBoolean';
import mustBeDefined from '../checks/mustBeDefined';
import mustBeObject from '../checks/mustBeObject';
import mustSatisfy from '../checks/mustSatisfy';
import readOnly from '../i18n/readOnly';
import ShareableArray from '../collections/ShareableArray';
import ShareableBase from './ShareableBase';
import VersionLogger from '../commands/VersionLogger';
import VertexBufferManager from './VertexBufferManager';
import WebGLClearColor from '../commands/WebGLClearColor';
import WebGLEnable from '../commands/WebGLEnable';
import WebGLDisable from '../commands/WebGLDisable';

/**
 * Fundamental abstractions in the architecture.
 *
 * @module EIGHT
 * @submodule core
 */

/**
 * @example
 *     // Anytime before calling the start method...
 *     const renderer = new EIGHT.Engine()
 *
 *     // When the canvas is available, usually in the window.onload function...
 *     renderer.start(canvas)
 *
 *     // At the start of each animation frame, before drawing...
 *     renderer.clear()
 *
 *     // When no longer needed, usually in the window.onunload function...
 *     renderer.release()
 *
 * @class Engine
 * @extends ShareableBase
 */
export default class Engine extends ShareableBase implements VertexBufferManager {

  /**
   * @property _gl
   * @type WebGLRenderingContext
   * @private
   */
  private _gl: WebGLRenderingContext

  /**
   * @property _canvas
   * @type HTMLCanvasElement
   * @private
   */
  private _canvas: HTMLCanvasElement

  private _attributes: WebGLContextAttributes

  // Remark: We only hold weak references to users so that the lifetime of resource
  // objects is not affected by the fact that they are listening for gl events.
  // Users should automatically add themselves upon construction and remove upon release.
  private _users: ContextConsumer[] = []

  private _webGLContextLost: (event: Event) => any
  private _webGLContextRestored: (event: Event) => any

  private _commands = new ShareableArray<ContextConsumer>([])

  private _contextProvider: DefaultContextProvider

  private _mayUseCache = true

  private colorFlag: boolean = true
  private depthFlag: boolean = true
  private stencilFlag: boolean = false
  private clearMask: number = clearMask(this.colorFlag, this.depthFlag, this.stencilFlag, null)

  /**
   * A cache of the parameters used in the last gl.viewport method call.
   * width and geight must be positive so this cache is initially dirty.
   */
  private _viewportArgs: { x: number; y: number; width: number, height: number } = {
    x: void 0,
    y: void 0,
    width: void 0,
    height: void 0
  }

  /**
   * @class Engine
   * @constructor
   * @param [attributes] {WebGLContextAttributes} Allows the context to be configured.
   */
  constructor(attributes?: WebGLContextAttributes) {
    super()
    this.setLoggingName('Engine')

    this._attributes = attributes;

    this._commands.pushWeakRef(new EIGHTLogger())
    this._commands.pushWeakRef(new VersionLogger())

    this._contextProvider = new DefaultContextProvider(this)

    // For convenience.
    this.enable(Capability.DEPTH_TEST)
    this.clearColor(0.1, 0.1, 0.1, 1.0)

    this._webGLContextLost = (event: Event) => {
      if (isDefined(this._canvas)) {
        event.preventDefault()
        this._gl = void 0
        this._users.forEach((user: ContextConsumer) => {
          user.contextLost()
        })
      }
    }

    this._webGLContextRestored = (event: Event) => {
      if (isDefined(this._canvas)) {
        event.preventDefault()
        this._gl = initWebGL(this._canvas, attributes)
        this._users.forEach((user: ContextConsumer) => {
          user.contextGain(this._contextProvider)
        })
      }
    }
  }

  /**
   * @method destructor
   * @param levelUp {number}
   * return {void}
   * @protected
   */
  protected destructor(levelUp: number): void {
    this.stop();
    this._contextProvider.release()
    while (this._users.length > 0) {
      this._users.pop();
    }
    this._commands.release();
    super.destructor(incLevel(levelUp))
  }

  /**
   * @method addContextListener
   * @param user {ContextConsumer}
   * @return {void}
   */
  addContextListener(user: ContextConsumer): void {
    mustBeObject('user', user)
    const index = this._users.indexOf(user)
    if (index < 0) {
      this._users.push(user)
    }
    else {
      console.warn("user already exists for addContextListener")
    }
  }

  /**
   * @property canvas
   * @type {HTMLCanvasElement}
   * @readOnly
   */
  get canvas(): HTMLCanvasElement {
    // FIXME: Retract this implicit starting behavior.
    if (!this._canvas) {
      this.start(document.createElement('canvas'))
    }
    return this._canvas;
  }
  set canvas(canvas: HTMLCanvasElement) {
    throw new Error(readOnly('canvas').message)
  }

  /**
   * @property commands
   * @type {ShareableArray}
   * @beta
   * @readOnly
   */
  get commands(): ShareableArray<ContextConsumer> {
    this._commands.addRef();
    return this._commands;
  }
  set commands(unused) {
    throw new Error(readOnly('commands').message)
  }

  /**
   * <p>
   * Determines whether this <code>Engine</code> may use a cache to optimize
   * <code>WebGLREnderingContext</code> calls.
   * </p>
   * <p>
   * The default value of this property is <code>true</code>.
   * Set this property to <code>false</code> if the WebGL API is being called
   * directly (not through <code>Engine</code>).
   * </p>
   *
   * @property mayUseCache
   * @type boolean
   * @default true
   */
  get mayUseCache(): boolean {
    return this._mayUseCache
  }
  set mayUseCache(mayUseCache: boolean) {
    this._mayUseCache = mustBeBoolean('mayUseCache', mayUseCache)
  }

  /**
   * <p>
   * Specifies color values to use by the <code>clear</code> method to clear the color buffer.
   * <p>
   *
   * @method clearColor
   * @param red {number}
   * @param green {number}
   * @param blue {number}
   * @param alpha {number}
   * @return {Engine}
   * @chainable
   */
  clearColor(red: number, green: number, blue: number, alpha: number): Engine {
    this._commands.pushWeakRef(new WebGLClearColor(red, green, blue, alpha))
    const gl = this._gl
    if (gl) {
      gl.clearColor(red, green, blue, alpha)
    }
    return this
  }

  /*
  createVertexBuffer(attributes: {[name:string]: Attribute}, aNames: string[]): VertexBufferPackage {
    const first = 0 // This could be different.
    const count = computeCount(attributes, aNames)
    const stride = computeStride(attributes, aNames)
    const pointers = computePointers(attributes, aNames)
    const array = computeAttributes(attributes, aNames)
    const vbo = new VertexBuffer(this)
    vbo.data = new Float32Array(array)
    const vbp = new VertexBufferPackage(first, vbo, this)
    vbo.release()
    return vbp
  }
  */

  /**
   * Turns off a specific WebGL capability for this context.
   *
   * @method disable
   * @param capability {Capability}
   * @return {Engine}
   * @chainable
   */
  disable(capability: Capability): Engine {
    this._commands.pushWeakRef(new WebGLDisable(capability))
    return this
  }

  /**
   * Turns on a specific WebGL capability for this context.
   *
   * @method enable
   * @param capability {Capability}
   * @return {Engine}
   * @chainable
   */
  enable(capability: Capability): Engine {
    this._commands.pushWeakRef(new WebGLEnable(capability))
    return this
  }

  /**
   * @property gl
   * @type {WebGLRenderingContext}
   * @readOnly
   */
  get gl(): WebGLRenderingContext {
    if (this._gl) {
      return this._gl
    }
    else {
      return void 0
    }
  }
  set gl(unused) {
    throw new Error(readOnly('gl').message)
  }

  /**
   * @method removeContextListener
   * @param user {ContextConsumer}
   * @return {void}
   */
  removeContextListener(user: ContextConsumer): void {
    mustBeObject('user', user)
    const index = this._users.indexOf(user)
    if (index >= 0) {
      this._users.splice(index, 1)
    }
  }

  /**
   * <p>
   * Sets the graphics buffers to values preselected by clearColor, clearDepth or clearStencil.
   * </p>
   *
   * @method clear
   * @return {void}
   */
  clear(): void {
    const gl = this._gl
    if (gl) {
      gl.clear(this.clearMask)
    }
  }

  /**
   * <p>
   * The viewport wifth and height are clamped to a range that is
   * implementation dependent.
   * </p>
   *
   * @method getMaxViewportDims
   * @return {Int32Array} e.g. Int32Array[16384, 16384]
   */
  getMaxViewportDims(): Int32Array {
    const gl = this._gl
    if (gl) {
      return gl.getParameter(gl.MAX_VIEWPORT_DIMS)
    }
    else {
      return void 0
    }
  }

  /**
   * <p>
   * Returns the current viewport settings.
   * </p>
   *
   * @method getViewport
   * @return {Int32Array} e.g. Int32Array[x, y, width, height]
   */
  getViewport(): Int32Array {
    const gl = this._gl
    if (gl) {
      return gl.getParameter(gl.VIEWPORT)
    }
    else {
      return void 0
    }
  }

  /**
   * Defines what part of the canvas will be used in rendering the drawing buffer.
   *
   * @method viewport
   * @param x {number}
   * @param y {number}
   * @param width {number}
   * @param height {number}
   * @return {Engine}
   * @chainable
   */
  viewport(x: number, y: number, width: number, height: number): Engine {
    const gl = this._gl;
    if (gl) {
      if (this._mayUseCache) {
        const args = this._viewportArgs;
        if (x !== args.x || y !== args.y || width !== args.width || height !== args.height) {
          gl.viewport(x, y, width, height)
          args.x = x
          args.y = y
          args.width = width
          args.height = height
        }
      }
      else {
        gl.viewport(x, y, width, height)
      }
    }
    else {
      if (config.errorMode === ErrorMode.WARNME) {
        console.warn(`${this._type}.viewport(${x}, ${y}, ${width}, ${height}) ignored because no context.`)
      }
    }
    return this
  }

  /**
   * Initializes the <code>WebGLRenderingContext</code> for the specified <code>HTMLCanvasElement</code>.
   *
   * @method start
   * @param canvas {HTMLCanvasElement} The HTML canvas element.
   * @return {Engine}
   * @chainable
   */
  start(canvas: HTMLCanvasElement): Engine {
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.warn("canvas must be an HTMLCanvasElement to start the context.")
      return this
    }
    mustBeDefined('canvas', canvas)
    const alreadyStarted = isDefined(this._canvas)
    if (!alreadyStarted) {
      // cache the arguments
      this._canvas = canvas
    }
    else {
      // We'll just be idempotent and ignore the call because we've already been started.
      // To use the canvas might conflict with one we have dynamically created.
      console.warn(`${this._type} Ignoring start() because already started.`)
      return
    }
    // What if we were given a "no-op" canvasBuilder that returns undefined for the canvas.
    // To not complain is the way of the hyper-functional warrior.
    if (isDefined(this._canvas)) {
      this._gl = initWebGL(this._canvas, this._attributes)
      this.clearMask = clearMask(this.colorFlag, this.depthFlag, this.stencilFlag, this._gl)
      this.emitStartEvent()
      this._canvas.addEventListener('webglcontextlost', this._webGLContextLost, false)
      this._canvas.addEventListener('webglcontextrestored', this._webGLContextRestored, false)
    }
    return this
  }

  /**
   * @method stop
   * @return {Engine}
   * @chainable
   */
  stop(): Engine {
    if (isDefined(this._canvas)) {
      this._canvas.removeEventListener('webglcontextrestored', this._webGLContextRestored, false)
      this._canvas.removeEventListener('webglcontextlost', this._webGLContextLost, false)
      if (this._gl) {
        this.emitStopEvent()
        this._gl = void 0
      }
      this._canvas = void 0
    }
    return this
  }

  private emitStartEvent() {
    this._users.forEach((user: ContextConsumer) => {
      this.emitContextGain(user)
    })
    this._commands.forEach((command) => {
      this.emitContextGain(command)
    })
  }

  private emitContextGain(consumer: ContextConsumer): void {
    if (this._gl.isContextLost()) {
      consumer.contextLost()
    }
    else {
      consumer.contextGain(this._contextProvider)
    }
  }

  private emitStopEvent() {
    this._users.forEach((user: ContextConsumer) => {
      this.emitContextFree(user)
    })
    this._commands.forEach((command) => {
      this.emitContextFree(command);
    })
  }

  private emitContextFree(consumer: ContextConsumer): void {
    if (this._gl.isContextLost()) {
      consumer.contextLost()
    }
    else {
      consumer.contextFree(this._contextProvider)
    }
  }

  /**
   * @method synchronize
   * @param consumer {ContextConsumer}
   * @return {void}
   */
  synchronize(consumer: ContextConsumer): void {
    if (this._gl) {
      this.emitContextGain(consumer)
    }
    else {
      // FIXME: Broken symmetry.
    }
  }
}

/**
 * Computes the mask required for the WebGL clear method.
 */
function clearMask(colorFlag: boolean, depthFlag: boolean, stencilFlag: boolean, gl: WebGLRenderingContext): number {
  let mask = 0
  if (colorFlag) {
    if (gl) {
      // Experimental code to determine if documented values are correct.
      mustSatisfy('COLOR_BUFFER_BIT', gl.COLOR_BUFFER_BIT === 0x4000, () => { return 'clearMask' })
      mask |= gl.COLOR_BUFFER_BIT
    }
    else {
      mask |= 0x4000
    }
  }
  if (depthFlag) {
    if (gl) {
      // Experimental code to determine if documented values are correct.
      mustSatisfy('DEPTH_BUFFER_BIT', gl.DEPTH_BUFFER_BIT === 0x0100, () => { return 'clearMask' })
      mask |= gl.DEPTH_BUFFER_BIT
    }
    else {
      mask |= 0x0100
    }
  }
  if (stencilFlag) {
    if (gl) {
      // Experimental code to determine if documented values are correct.
      mustSatisfy('STENCIL_BUFFER_BIT', gl.STENCIL_BUFFER_BIT === 0x0400, () => { return 'clearMask' })
      mask |= gl.STENCIL_BUFFER_BIT
    }
    else {
      mask |= 0x0400
    }
  }
  return mask
}