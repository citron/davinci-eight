/// <reference path='../geometries/VertexAttributeProvider.d.ts'/>
import cuboid = require('../geometries/cuboid');
class BoxGeometry implements VertexAttributeProvider {
  private cuboid: CuboidGeometry;
  constructor(
    width: number,
    height: number,
    depth: number,
    widthSegments?: number,
    heightSegments?: number,
    depthSegments?: number) {
      this.cuboid = cuboid();
      this.cuboid.a = this.cuboid.a.scalarMultiply(width);
      this.cuboid.b = this.cuboid.b.scalarMultiply(height);
      this.cuboid.c = this.cuboid.c.scalarMultiply(depth);
  }
  draw(context: WebGLRenderingContext) {
    return this.cuboid.draw(context);
  }
  dynamics() {
    return this.cuboid.dynamics();
  }
  hasElements() {
    return this.cuboid.hasElements();
  }
  getElements() {
    return this.cuboid.getElements();
  }
  getVertexAttributeData(name: string) {
    return this.cuboid.getVertexAttributeData(name);
  }
  getAttributeMetaInfos() {
    return this.cuboid.getAttributeMetaInfos();
  }
  update(time: number, attributes: {modifiers: string[], type: string, name: string}[]) {
    return this.cuboid.update(time, attributes);
  }
}

export = BoxGeometry;
