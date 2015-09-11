import AbstractMatrix = require('../math/AbstractMatrix');
import GeometricElement = require('../math/GeometricElement');
declare class Matrix1 extends AbstractMatrix implements GeometricElement<Matrix1, Matrix1> {
    /**
     * Constructs a Matrix1 by wrapping a Float32Array.
     * @constructor
     */
    constructor(data: Float32Array);
    static identity(): Matrix1;
    add(element: Matrix1): Matrix1;
    addVectors(a: Matrix1, b: Matrix1): Matrix1;
    clone(): Matrix1;
    copy(m: Matrix1): Matrix1;
    divideScalar(scalar: number): Matrix1;
    exp(): Matrix1;
    lerp(target: Matrix1, alpha: number): Matrix1;
    magnitude(): number;
    multiply(rhs: Matrix1): Matrix1;
    multiplyScalar(scalar: number): Matrix1;
    quaditude(): number;
    sub(element: Matrix1): Matrix1;
}
export = Matrix1;
