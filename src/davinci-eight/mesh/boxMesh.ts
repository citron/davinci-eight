import AttribProvider = require('../core/AttribProvider');
import DrawMode = require('../core/DrawMode');
import Geometry3 = require('../geometries/Geometry3');
import GeometryAdapter = require('../geometries/GeometryAdapter');
import BoxGeometry = require('../geometries/BoxGeometry');
import adapterOptions = require('../mesh/adapterOptions');
import BoxOptions = require('../mesh/BoxOptions');
import RenderingContextMonitor = require('../core/RenderingContextMonitor');

function boxGeometry(options?: BoxOptions): Geometry3 {
  options = options || {};
  return new BoxGeometry(
    options.width,
    options.height,
    options.depth,
    options.widthSegments,
    options.heightSegments,
    options.depthSegments,
    options.wireFrame);
}

function boxMesh(monitor: RenderingContextMonitor, options?: BoxOptions) : AttribProvider {

  let base = new GeometryAdapter(monitor, boxGeometry(options), adapterOptions(options));
  base.addRef();
  var refCount: number = 1;

  let self: AttribProvider = {
    draw() {
      return base.draw();
    },
    update() {
      return base.update();
    },
    getAttribData() {
      return base.getAttribData();
    },
    getAttribMeta() {
      return base.getAttribMeta();
    },
    get drawMode() {
      return base.drawMode;
    },
    set drawMode(value: DrawMode) {
      base.drawMode = value;
    },
    get dynamic() {
      return base.dynamic;
    },
    addRef(): number {
      refCount++;
      return refCount;
    },
    release(): number {
      refCount--;
      if (refCount === 0) {
        base.release();
        base = void 0;
      }
      return refCount;
    },
    contextFree() {
      return base.contextFree();
    },
    contextGain(context: WebGLRenderingContext) {
      return base.contextGain(context);
    },
    contextLoss() {
      return base.contextLoss();
    }
  };
  return self;
}

export = boxMesh;
