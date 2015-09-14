import AttribMetaInfos = require('../core/AttribMetaInfos');
import DefaultAttribProvider = require('../core/DefaultAttribProvider');

function makeArray(length: number) {
  var xs: number[] = [];
  for (var i = 0; i < length; i++) {
    xs.push(1.0);
    xs.push(1.0);
    xs.push(1.0);
  }
  return xs;
}

class LatticeMesh extends DefaultAttribProvider {
  private elements: Uint16Array;
  private vertices: Float32Array;
  private vertexColors: Float32Array;
  private vertexNormals: Float32Array;
  private I: number;
  private J: number;
  private K: number;
  private generator: (i: number, j: number, k: number) => { x: number; y: number; z: number };
  public drawMode: number = 0;
  constructor(I: number, J: number, K: number, generator: (i: number, j: number, k: number) => {x:number;y:number;z:number}) {
    super();
    this.I = I;
    this.J = J;
    this.K = K;
    this.generator = generator;
  }
  draw(context: WebGLRenderingContext) {
    context.drawElements(context.POINTS, this.elements.length, context.UNSIGNED_SHORT, 0);
  }
  get dynamic(): boolean {
    return true;
  }
  getAttribMeta(): AttribMetaInfos {
    return {
      position: { name: 'aPosition', type: 'vec3', size: 3, normalized: false, stride: 0, offset: 0 },
      color:    { name: 'aColor',    type: 'vec3', size: 3, normalized: false, stride: 0, offset: 0 }
    };
  }
  update(): void {
    var I = this.I;
    var J = this.J;
    var K = this.K;
    var generator = this.generator;
    var vs: number[] = [];
    var ps: number[] = [];
    var pointIndex = 0;
    for (var i = -I; i <= I; i++) {
      for (var j = -J; j <= J; j++) {
        for (var k = -K; k <= K; k++) {
          var pos = generator(i, j, k);
          vs.push(pos.x);
          vs.push(pos.y);
          vs.push(pos.z);
          ps.push(pointIndex);
          pointIndex++;
        }
      }
    }
    this.elements = new Uint16Array(ps);
    this.vertices = new Float32Array(vs);
    this.vertexColors = new Float32Array(makeArray(ps.length));
    this.vertexNormals = new Float32Array(makeArray(ps.length));
  }
}
export = LatticeMesh;
