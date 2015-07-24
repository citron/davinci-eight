/// <reference path="../../../src/gl-matrix.d.ts" />
/// <amd-dependency path="gl-matrix" name="glMatrix"/>
import Matrix4 = require('./Matrix4');
declare var glMatrix: glMatrix;

class Matrix3 {
  public elements: number[] = glMatrix.mat3.create();
  constructor() {
  }
  identity(): void {
    glMatrix.mat3.identity(this.elements);
  }
  getInverse(matrix: Matrix4, throwOnInvertible?: boolean): Matrix3 {

    // input: THREE.Matrix4
    // ( based on http://code.google.com/p/webgl-mjs/ )

    var me = matrix.elements;
    var te = this.elements;

    te[ 0 ] =   me[ 10 ] * me[ 5 ] - me[ 6 ] * me[ 9 ];
    te[ 1 ] = - me[ 10 ] * me[ 1 ] + me[ 2 ] * me[ 9 ];
    te[ 2 ] =   me[ 6 ] * me[ 1 ] - me[ 2 ] * me[ 5 ];
    te[ 3 ] = - me[ 10 ] * me[ 4 ] + me[ 6 ] * me[ 8 ];
    te[ 4 ] =   me[ 10 ] * me[ 0 ] - me[ 2 ] * me[ 8 ];
    te[ 5 ] = - me[ 6 ] * me[ 0 ] + me[ 2 ] * me[ 4 ];
    te[ 6 ] =   me[ 9 ] * me[ 4 ] - me[ 5 ] * me[ 8 ];
    te[ 7 ] = - me[ 9 ] * me[ 0 ] + me[ 1 ] * me[ 8 ];
    te[ 8 ] =   me[ 5 ] * me[ 0 ] - me[ 1 ] * me[ 4 ];

    var det = me[ 0 ] * te[ 0 ] + me[ 1 ] * te[ 3 ] + me[ 2 ] * te[ 6 ];

    // no inverse

    if ( det === 0 ) {

      var msg = "Matrix3.getInverse(): can't invert matrix, determinant is 0";

      if ( throwOnInvertible || !throwOnInvertible ) {

        throw new Error( msg );

      } else {

        console.warn( msg );

      }

      this.identity();

      return this;

    }

    this.multiplyScalar( 1.0 / det );

    return this;

  }
  multiplyScalar(s: number): Matrix3 {
    let m = this.elements;
    m[0] *= s; m[3] *= s; m[6] *= s;
    m[1] *= s; m[4] *= s; m[7] *= s;
    m[2] *= s; m[5] *= s; m[8] *= s;
    return this;
  }
  normalFromMatrix4(m: Matrix4): void {
    this.getInverse(m).transpose();
  }
  transpose(): Matrix3 {
    var tmp: number;
    var m = this.elements;

    tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
    tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
    tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

    return this;

  }
}

export = Matrix3;