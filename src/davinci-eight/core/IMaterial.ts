import IResource = require('../core/IResource');
import AttribLocation = require('../core/AttribLocation');
import UniformLocation = require('../core/UniformLocation');
import UniformDataVisitor = require('../core/UniformDataVisitor');

// FIXME: Handle lists of shaders.

/**
 * <p>
 * The role of a IMaterial is to manage WebGLProgram(s) consisting of a vertex shader and fragment shader.
 * The Program must be able to provide introspection information that describes the program.
 * </p>
 * @class IMaterial
 * @extends IResource
 * @extends UniformDataVisitor
 * @beta
 */
interface IMaterial extends IResource, UniformDataVisitor {
  /**
   * @property programId
   * @type string
   */
  // FIXME: rename material id or simply uuid.
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
   * Makes the Program the current program for WebGL.
   * @method use
   * @param canvasId {number} Determines which WebGLProgram to use.
   * @return {void}
   */
  use(canvasId: number): void;
  /**
   * @property attributeLocations
   * @type { [name: string]: AttribLocation }
   */
  attributes(canvasId: number): { [name: string]: AttribLocation };
  /**
   * @property uniforms
   * @type { [name: string]: UniformLocation }
   */
  // FIXME: Need canvasId because of locations.
  uniforms(canvasId: number): { [name: string]: UniformLocation };
  /**
   * <p>
   * Enables an attribute location of a WebGLProgram.
   * </p>
   * @method enableAttrib
   * @param name {string} The name of the attribute to enable.
   * @beta
   */
  // FIXME: Can we move to the attribute index?
  enableAttrib(name: string, canvasId: number): void;
  /**
   * <p>
   * Enables an attribute location of a WebGLProgram.
   * </p>
   * @method disableAttrib
   * @param name {string} The name of the attribute disable.
   * @beta
   */
  // FIXME: Can we move to the attribute index?
  disableAttrib(name: string, canvasId: number): void;
}

export = IMaterial;
