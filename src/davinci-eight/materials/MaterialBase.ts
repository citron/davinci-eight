import AttribLocation from '../core/AttribLocation';
import config from '../config';
import ContextProvider from '../core/ContextProvider';
import incLevel from '../base/incLevel';
import isDefined from '../checks/isDefined';
import isString from '../checks/isString';
import isNull from '../checks/isNull';
import makeWebGLProgram from '../core/makeWebGLProgram';
import Material from '../core/Material'
import Engine from '../core/Engine';
import ErrorMode from '../core/ErrorMode';
import Matrix2 from '../math/Matrix2';
import Matrix3 from '../math/Matrix3';
import Matrix4 from '../math/Matrix4';
import mustBeArray from '../checks/mustBeArray';
import mustBeString from '../checks/mustBeString';
import mustBeUndefined from '../checks/mustBeUndefined';
import readOnly from '../i18n/readOnly';
import ShareableContextConsumer from '../core/ShareableContextConsumer';
import UniformLocation from '../core/UniformLocation';
import VectorE2 from '../math/VectorE2';
import VectorE3 from '../math/VectorE3';
import VectorE4 from '../math/VectorE4';

/**
 * @module EIGHT
 * @submodule materials
 */

/**
 * @class MaterialBase
 * @extends ShareableContextConsumer
 */
export default class MaterialBase extends ShareableContextConsumer implements Material {

  /**
   * @property _vertexShaderSrc
   * @type string
   * @private
   */
  private _vertexShaderSrc: string

  /**
   * @property _fragmentShaderSrc
   * @type string
   * @private
   */
  private _fragmentShaderSrc: string

  /**
   * @property _attribs
   * @type string[]
   * @private
   */
  private _attribs: string[]

  /**
   * @property _program
   * @type WebGLProgram
   * @private
   */
  private _program: WebGLProgram

  /**
   * @property _attributes
   * @type {[name: string]: AttribLocation}
   * @private
   */
  private _attributes: { [name: string]: AttribLocation } = {}

  /**
   * @property _uniforms
   * @type {{[name: string]: UniformLocation}}
   * @private
   */
  private _uniforms: { [name: string]: UniformLocation } = {}

  /**
   * @class MaterialBase
   * @constructor
   * @param vertexShaderSrc {string} The vertex shader source code.
   * @param fragmentShaderSrc {string} The fragment shader source code.
   * @param attribs {string[]} The attribute ordering.
   * @param engine {Engine} The <code>Engine</code> to subscribe to or <code>null</code> for deferred subscription.
   */
  constructor(vertexShaderSrc: string, fragmentShaderSrc: string, attribs: string[], engine: Engine) {
    super(engine)
    this.setLoggingName('MaterialBase')
    if (isDefined(vertexShaderSrc) && !isNull(vertexShaderSrc)) {
      this._vertexShaderSrc = mustBeString('vertexShaderSrc', vertexShaderSrc)
    }
    if (isDefined(fragmentShaderSrc) && !isNull(fragmentShaderSrc)) {
      this._fragmentShaderSrc = mustBeString('fragmentShaderSrc', fragmentShaderSrc)
    }
    this._attribs = mustBeArray('attribs', attribs)
  }

  /**
   * @method destructor
   * @param level {number}
   * @return {void}
   * @protected
   */
  protected destructor(level: number): void {
    if (level === 0) {
      this.cleanUp()
    }
    mustBeUndefined(this._type, this._program)
    super.destructor(incLevel(level))
  }

  /**
   * @method contextGain
   * @param context {ContextProvider}
   * @return {void}
   */
  contextGain(context: ContextProvider): void {
    const gl = context.gl
    if (!this._program && isString(this._vertexShaderSrc) && isString(this._fragmentShaderSrc)) {
      this._program = makeWebGLProgram(gl, this._vertexShaderSrc, this._fragmentShaderSrc, this._attribs)
      this._attributes = {}
      this._uniforms = {}

      const aLen: number = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES)
      for (let a = 0; a < aLen; a++) {
        const attribInfo: WebGLActiveInfo = gl.getActiveAttrib(this._program, a)
        this._attributes[attribInfo.name] = new AttribLocation(attribInfo)
      }

      const uLen: number = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS)
      for (let u = 0; u < uLen; u++) {
        const uniformInfo: WebGLActiveInfo = gl.getActiveUniform(this._program, u)
        this._uniforms[uniformInfo.name] = new UniformLocation(uniformInfo)
      }

      for (let aName in this._attributes) {
        if (this._attributes.hasOwnProperty(aName)) {
          this._attributes[aName].contextGain(gl, this._program);
        }
      }
      for (let uName in this._uniforms) {
        if (this._uniforms.hasOwnProperty(uName)) {
          this._uniforms[uName].contextGain(gl, this._program);
        }
      }
    }
    super.contextGain(context)
  }

  /**
   * @method contextLost
   * @return {void}
   */
  contextLost(): void {
    this._program = void 0
    for (var aName in this._attributes) {
      if (this._attributes.hasOwnProperty(aName)) {
        this._attributes[aName].contextLost()
      }
    }
    for (var uName in this._uniforms) {
      if (this._uniforms.hasOwnProperty(uName)) {
        this._uniforms[uName].contextLost()
      }
    }
    super.contextLost()
  }

  /**
   * @method contextFree
   * @param context {ContextProvider}
   * @return {void}
   */
  contextFree(context: ContextProvider): void {
    if (this._program) {
      const gl = context.gl
      if (gl) {
        if (!gl.isContextLost()) {
          gl.deleteProgram(this._program)
        }
        else {
          // WebGL has lost the context, effectively cleaning up everything.
        }
      }
      else {
        console.warn("memory leak: WebGLProgram has not been deleted because WebGLRenderingContext is not available anymore.")
      }
      this._program = void 0
    }
    for (let aName in this._attributes) {
      if (this._attributes.hasOwnProperty(aName)) {
        this._attributes[aName].contextFree()
      }
    }
    for (let uName in this._uniforms) {
      if (this._uniforms.hasOwnProperty(uName)) {
        this._uniforms[uName].contextFree()
      }
    }
    super.contextFree(context)
  }

  /**
   * @method use
   * @return {void}
   */
  use(): void {
    const gl = this.gl
    if (gl) {
      gl.useProgram(this._program)
    }
    else {
      console.warn(`${this._type}.use() missing WebGL rendering context.`)
    }
  }

  /**
   * @property vertexShaderSrc
   * @type string
   */
  get vertexShaderSrc(): string {
    return this._vertexShaderSrc
  }
  set vertexShaderSrc(vertexShaderSrc: string) {
    this._vertexShaderSrc = mustBeString('vertexShaderSrc', vertexShaderSrc)
    if (this.contextProvider) {
      this.contextProvider.addRef()
      const contextProvider = this.contextProvider
      try {
        this.contextFree(contextProvider)
        this.contextGain(contextProvider)
      }
      finally {
        contextProvider.release()
      }
    }
  }

  /**
   * @property fragmentShaderSrc
   * @type string
   */
  get fragmentShaderSrc(): string {
    return this._fragmentShaderSrc
  }
  set fragmentShaderSrc(fragmentShaderSrc: string) {
    this._fragmentShaderSrc = mustBeString('fragmentShaderSrc', fragmentShaderSrc)
    if (this.contextProvider) {
      this.contextProvider.addRef()
      const contextProvider = this.contextProvider
      try {
        this.contextFree(contextProvider)
        this.contextGain(contextProvider)
      }
      finally {
        contextProvider.release()
      }
    }
  }

  /**
   * @property attributeNames
   * @type string[]
   * @readOnly
   */
  get attributeNames(): string[] {
    const attributes = this._attributes
    if (attributes) {
      return Object.keys(attributes)
    }
    else {
      return void 0
    }
  }
  set attributeNames(unused) {
    throw new Error(readOnly('attributeNames').message)
  }

  /**
   * @method enableAttrib
   * @param name {string}
   * @return {void}
   */
  enableAttrib(name: string): void {
    const attribLoc = this._attributes[name]
    if (attribLoc) {
      attribLoc.enable()
    }
  }

  /**
   * @method enableAttribs
   * @return {void}
   */
  enableAttribs(): void {
    const attribLocations = this._attributes
    if (attribLocations) {
      // TODO: Store loactions as a plain array in order to avoid temporaries (aNames)
      const aNames = Object.keys(attribLocations)
      for (var i = 0, iLength = aNames.length; i < iLength; i++) {
        attribLocations[aNames[i]].enable()
      }
    }
  }

  /**
   * @method disableAttrib
   * @param name {string}
   * @return {void}
   */
  disableAttrib(name: string): void {
    const attribLoc = this._attributes[name]
    if (attribLoc) {
      attribLoc.disable()
    }
  }

  /**
   * @method disableAttribs
   * @return {void}
   */
  disableAttribs(): void {
    const attribLocations = this._attributes
    if (attribLocations) {
      // TODO: Store loactions as a plain array in order to avoid temporaries (aNames)
      const aNames = Object.keys(attribLocations)
      for (var i = 0, iLength = aNames.length; i < iLength; i++) {
        attribLocations[aNames[i]].disable()
      }
    }
  }

  /**
   * Returns the location (index) of the attribute with the specified name.
   * Returns <code>-1</code> if the name does not correspond to an attribute.
   *
   * @method getAttribLocation
   * @param name {string}
   * @return {number}
   */
  getAttribLocation(name: string): number {
    const attribLoc = this._attributes[name]
    if (attribLoc) {
      return attribLoc.index
    }
    else {
      return -1
    }
  }

  /**
   * <p>
   * Returns a <code>UniformLocation</code> object corresponding to the <code>uniform</code>
   * parameter of the same name in the shader code. If a uniform parameter of the specified name
   * does not exist, this method throws a descriptive <code>Error</code>.
   * </p>
   *
   * @method getUniformLocation
   * @param name {string}
   * @return {UniformLocation} The location object bound to the specified name.
   */
  getUniformLocation(name: string): UniformLocation {
    const uniforms = this._uniforms
    if (uniforms[name]) {
      return this._uniforms[name]
    }
    else {
      const msg = `uniform ${name} not found.`
      switch (config.errorMode) {
        case ErrorMode.WARNME: {
          console.warn(msg)
          return new UniformLocation(null)
        }
        case ErrorMode.IGNORE: {
          return new UniformLocation(null)
        }
        default: {
          // In STRICT mode, throwing an Error is consistent with the the other modes
          // returning a null-like UniformLocation. Returning void 0 would be inconsistent
          // even though it allows testing for the existence of a uniform. 
          throw new Error(msg)
        }
      }
    }
  }

  /**
   * <p>
   * Determines whether a <code>uniform</code> with the specified <code>name</code> exists in the <code>WebGLProgram</code>.
   * </p>
   *
   * @method hasUniformLocation
   * @param name {string}
   * @return {boolean}
   */
  hasUniformLocation(name: string): boolean {
    return isDefined(this._uniforms[name])
  }

  /**
   * @method vertexPointer
   * @param name {string}
   * @param size {number}
   * @param normalized {boolean}
   * @param stride {number}
   * @param offset {number}
   * @return {void}
   */
  vertexPointer(name: string, size: number, normalized: boolean, stride: number, offset: number): void {
    const attributeLocation = this._attributes[name]
    attributeLocation.vertexPointer(size, normalized, stride, offset)
  }

  /**
   * @method uniform1f
   * @param name {string}
   * @param x {number}
   * @return {void}
   */
  uniform1f(name: string, x: number): void {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform1f(x)
    }
  }

  /**
   * @method uniform2f
   * @param name {string}
   * @param x {number}
   * @param y {number}
   * @return {void}
   */
  uniform2f(name: string, x: number, y: number): void {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform2f(x, y)
    }
  }

  /**
   * @method uniform3f
   * @param name {string}
   * @param x {number}
   * @param y {number}
   * @param z {number}
   * @return {void}
   */
  uniform3f(name: string, x: number, y: number, z: number): void {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform3f(x, y, z)
    }
  }

  /**
   * @method uniform4f
   * @param name {string}
   * @param x {number}
   * @param y {number}
   * @param z {number}
   * @param w {number}
   * @return {void}
   */
  uniform4f(name: string, x: number, y: number, z: number, w: number): void {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform4f(x, y, z, w)
    }
  }

  /**
   * @method mat2
   * @param name {string}
   * @param matrix {Matrix2}
   * @param transpose {boolean}
   * @return {void}
   */
  mat2(name: string, matrix: Matrix2, transpose: boolean): void {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.matrix2fv(transpose, matrix.elements)
    }
  }

  /**
   * @method mat3
   * @param name {string}
   * @param matrix {Matrix3}
   * @param transpose {boolean}
   * @return {void}
   */
  mat3(name: string, matrix: Matrix3, transpose: boolean) {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.matrix3fv(transpose, matrix.elements)
    }
  }

  /**
   * @method mat4
   * @param name {string}
   * @param matrix {Matrix4}
   * @param transpose {boolean}
   * @return {void}
   */
  mat4(name: string, matrix: Matrix4, transpose: boolean) {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.matrix4fv(transpose, matrix.elements)
    }
  }

  /**
   * @method vec2
   * @param name {string}
   * @param vector {VectorE2}
   * @return {void}
   */
  vec2(name: string, vector: VectorE2) {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform2f(vector.x, vector.y)
    }
  }

  /**
   * @method vec3
   * @param name {string}
   * @param vector {VectorE3}
   * @return {void}
   */
  vec3(name: string, vector: VectorE3) {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform3f(vector.x, vector.y, vector.z)
    }
  }

  /**
   * @method vec4
   * @param name {string}
   * @param vector {VectorE4}
   * @return {void}
   */
  vec4(name: string, vector: VectorE4) {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform4f(vector.x, vector.y, vector.z, vector.w)
    }
  }

  /**
   * @method vector2fv
   * @param name {string}
   * @param data {Float32Array}
   * @return {void}
   */
  vector2fv(name: string, data: Float32Array): void {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform2fv(data)
    }
  }

  /**
   * @method vector3fv
   * @param name {string}
   * @param data {Float32Array}
   * @return {void}
   */
  vector3fv(name: string, data: Float32Array): void {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform3fv(data)
    }
  }

  /**
   * @method vector4fv
   * @param name {string}
   * @param data {Float32Array}
   * @return {void}
   */
  vector4fv(name: string, data: Float32Array): void {
    const uniformLoc = this._uniforms[name]
    if (uniformLoc) {
      uniformLoc.uniform4fv(data)
    }
  }
}