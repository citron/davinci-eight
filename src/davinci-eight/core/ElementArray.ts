import AttribProvider = require('../core/AttribProvider');
import convertUsage = require('../core/convertUsage');
import DataUsage = require('../core/DataUsage');

/**
 * Manages the (optional) WebGLBuffer used to support gl.drawElements().
 * @class ElementArray
 */
class ElementArray {
  private buffer: WebGLBuffer;
  private attributes: AttribProvider;
  private context: WebGLRenderingContext;
  /**
   * @class ElementArray
   * @constructor
   * @param attributes {AttribProvider}
   */
  constructor(attributes: AttribProvider) {
    this.attributes = attributes;
  }
  /**
   * @method contextFree
   */
  contextFree() {
    if (this.buffer) {
      this.context.deleteBuffer(this.buffer);
      this.buffer = void 0;
    }
    this.context = void 0;
  }
  /**
   * @method contextGain
   * @param context {WebGLRenderingContext}
   */
  contextGain(context: WebGLRenderingContext, contextId : string) {
    if (this.attributes.hasElementArray()) {
      this.buffer = context.createBuffer();
    }
    this.context = context;
  }
  /**
   * @method contextLoss
   */
  contextLoss() {
    this.buffer = void 0;
    this.context = void 0;
  }
  /**
   * @method bufferData
   * @param attributes {AttribProvider}
   */
  bufferData(attributes: AttribProvider) {
    if (this.buffer) {
      let elements: { usage: DataUsage; data: Uint16Array } = attributes.getElementArray();
      this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.buffer);
      let usage: number = convertUsage(elements.usage, this.context);
      this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, elements.data, usage);
    }
  }
  /**
   * @method bind
   */
  bind() {
    if (this.buffer) {
      this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.buffer);
    }
  }
}

export = ElementArray;