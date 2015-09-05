import AttribDataInfo = require('../core/AttribDataInfo');
import AttribDataInfos = require('../core/AttribDataInfos');
import RenderingContextUser = require('../core/RenderingContextUser');
import ShaderAttribLocation = require('../core/ShaderAttribLocation');
import UniformLocation = require('../core/UniformLocation');
import UniformDataVisitor = require('../core/UniformDataVisitor');
/**
 * The role of a ShaderProgram is to manage the WebGLProgram consisting of a vertex shader and fragment shader.
 * The ShaderProgram must be able to provide introspection information that describes the program.
 * @class ShaderProgram
 * @extends RenderingContextUser
 */
interface ShaderProgram extends RenderingContextUser, UniformDataVisitor {
  /**
   * @property program
   * @type WebGLProgram
   */
  program: WebGLProgram;
  /**
   * @property programId
   * @type string
   */
  programId: string;
  /**
   * @property vertexShader
   * @type string
   */
  vertexShader: string;
  /**
   * @property fragmentShader
   * @type string
   */
  fragmentShader: string;
  /**
   * Makes the ShaderProgram the current program for WebGL.
   * @method use
   */
  use(): ShaderProgram;
  /**
   * Sets the attributes provided into the appropriate locations.
   */
  setAttributes(values: AttribDataInfos);
  /**
   *
   */
  // TODO: Prbably should be an array b/c name already in value.
  // Might then be an opportunity to bind to the index?
  attributeLocations: { [name: string]: ShaderAttribLocation };
  /**
   *
   */
  // TODO: Prbably should be an array b/c name already in value.
  // Might then be an opportunity to bind to the index?
  uniforms: { [name: string]: UniformLocation };
  /**
   *
   */
  enableAttrib(name: string);
}

export = ShaderProgram;
