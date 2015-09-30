import IContextCommand = require('../core/IContextCommand');
import mustBeNumber = require('../checks/mustBeNumber');
import Shareable = require('../utils/Shareable');

let QUALIFIED_NAME = 'EIGHT.VersionLogger'

/**
 * <p>
 * Displays details about the WegGL version to the console.
 * <p> 
 * <p>
 * Initializes the <code>type</code> property to <code>'VersionLogger'</code> for reference count tracking.
 * <p>
 * @class VersionLogger
 * @extends Shareable
 * @implements IContextCommand
 */
class VersionLogger extends Shareable implements IContextCommand {
  /**
   * @class VersionLogger
   * @constructor
   */
  constructor() {
    super(QUALIFIED_NAME)
  }
  /**
   * <p>
   * Logs the WebGL <code>VERSION</code> parameter to the console.
   * </p>
   * @method execute
   * @param gl {WebGLRenderingContext}
   * @return {void}
   */
  execute(gl: WebGLRenderingContext): void {
    console.log(gl.getParameter(gl.VERSION))
  }
  /**
   * @method destructor
   * @return {void}
   * @protected
   */
  protected destructor(): void {
  }
  get name(): string {
    return QUALIFIED_NAME
  }
}

export = VersionLogger;