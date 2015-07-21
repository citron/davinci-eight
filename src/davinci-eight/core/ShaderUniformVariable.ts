/**
 * Utility class for managing a shader uniform variable.
 * @class ShaderUniformVariable
 */
class ShaderUniformVariable {
  public name: string;
  public type: string;
  private context: WebGLRenderingContext;
  private location: WebGLUniformLocation;
  /**
   * @class ShaderUniformVariable
   * @constructor
   * @param name {string} The name of the uniform variable, as it appears in the vertex shader code.
   * @param type {string} The type of the uniform variale, as it appears in the vertex shader code.  
   */
  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
    switch(type) {
      case 'vec3':
      case 'vec4':
      case 'mat3':
      case 'mat4': {
      }
      break;
      default: {
        throw new Error("Illegal argument type in ShaderUniformVariable constructor: " + type);
      }
    }
  }
  /**
   * @method contextFree
   */
  contextFree() {
    this.location = null;
    this.context = null;
  }
  /**
   * @method contextGain
   * @param context {WebGLRenderingContext}
   * @param program {WebGLProgram}
   */
  contextGain(context: WebGLRenderingContext, program: WebGLProgram) {
    this.location = context.getUniformLocation(program, this.name);
    this.context = context;
  }
  /**
   * @method contextLoss
   */
  contextLoss() {
    this.location = null;
    this.context = null;
  }
  /**
   * @method vec3
   * @param data {number[]}
   */
  vec3(data: number[]) {
    this.context.uniform3fv(this.location, data);
  }
  /**
   * @method vec4
   * @param data {number[]}
   */
  vec4(data: number[]) {
    this.context.uniform4fv(this.location, data);
  }
  /**
   * @method mat3
   * @param transpose {boolean}
   * @param matrix {Float32Array}
   */
  mat3(transpose: boolean, matrix: Float32Array) {
    if (!(matrix instanceof Float32Array)) {
      throw new Error("matrix must be a Float32Array.");
    }
    this.context.uniformMatrix3fv(this.location, transpose, matrix);
  }
  /**
   * @method mat4
   * @param transpose {boolean}
   * @param matrix {Float32Array}
   */
  mat4(transpose: boolean, matrix: Float32Array) {
    if (!(matrix instanceof Float32Array)) {
      throw new Error("matrix must be a Float32Array.");
    }
    this.context.uniformMatrix4fv(this.location, transpose, matrix);
  }
  /**
   * @method toString
   */
  toString(): string {
    return ["ShaderUniformVariable({name: ", this.name, ", type: ", this.type + "})"].join('');
  }
}

export = ShaderUniformVariable;
