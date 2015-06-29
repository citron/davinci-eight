/// <reference path="../geometries/Geometry.d.ts" />

function makeArray(length: number) {
  var xs: number[] = [];
  for (var i = 0; i < length; i++) {
    xs.push(1.0);
    xs.push(1.0);
    xs.push(1.0);
  }
  return xs;
}

class LatticeGeometry implements Geometry {
  private elements: Uint16Array;
  private vertices: Float32Array;
  private vertexColors: Float32Array;
  private vertexNormals: Float32Array;
  private I: number;
  private J: number;
  private K: number;
  private generator: (i: number, j: number, k: number, time: number) => {x:number;y:number;z:number}
  constructor(I: number, J: number, K: number, generator: (i: number, j: number, k: number, time: number) => {x:number;y:number;z:number}) {
    this.I = I;
    this.J = J;
    this.K = K;
    this.generator = generator;
  }
  draw(context: WebGLRenderingContext) {
    context.drawElements(context.POINTS, this.elements.length, context.UNSIGNED_SHORT, 0);
  }
  dynamic(): boolean {
    return true;
  }
  getAttributes() {
    return [
      {name: 'aVertexPosition', size: 3},
      {name: 'aVertexColor', size: 3}
    ];
  }
  getElements(): Uint16Array {
    return this.elements;
  }
  getVertexAttribArrayData(name: string): Float32Array {
    switch(name) {
      case 'aVertexPosition': {
        return this.vertices;
      }
      case 'aVertexColor': {
        return this.vertexColors;
      }
      case 'aVertexNormal': {
        return this.vertexNormals;
      }
      default: {
        return;
//      throw new Error(name);
      }
    }
  }
  update(time: number): void {
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
          var pos = generator(i, j, k, time);
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
export = LatticeGeometry;