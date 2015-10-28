import GeometricElement = require('../math/GeometricElement');
import MutableLinearElement = require('../math/MutableLinearElement');
/**
 * This interface is provided to ensure consistency.
 * It is not part of the documented API.
 */
interface MutableGeometricElement<I, M, S, V> extends GeometricElement<I, M, S, V>, MutableLinearElement<I, M, S, V> {
    /**
     * Sets this multivector to the left contraction of the multivectors.
     */
    lco2(a: I, b: I): M;
    /**
     * Sets this multivector to the right contraction of the multivectors.
     */
    rco2(a: I, b: I): M;
    /**
     * Sets this multivector to the value of the scalar, <code>α</code>.
     */
    copyScalar(α: number): M;
    /**
     * Sets this multivector to the value of the spinor.
     */
    copySpinor(spinor: S): M;
    /**
     * Sets this multivector to the value of the vector.
     */
    copyVector(vector: V): M;
    /**
     * Sets this multivector to a / b. This may not be defined.
     */
    div2(a: I, b: I): M;
    /**
     * Sets this multivector to the geometric product of the multivectors.
     */
    mul2(a: I, b: I): M;
    /**
     * Sets this multivector to this / norm(this)
     */
    normalize(): void;
    /**
     * Sets this multivector to a unitary spinor (a rotor), even if the vectors are not normalized.
     */
    rotorFromDirections(a: V, b: V): M;
    /**
     * Sets this multivector to a unitary spinor (a rotor).
     */
    rotorFromGeneratorAngle(B: S, θ: number): M;
    /**
     * Sets this multivector to the scalar product of the multivectors.
     */
    scp2(a: I, b: I): M;
    /**
     * Sets this multivector to the geometric product of the vectors.
     */
    spinor(a: V, b: V): M;
    /**
     * Sets this multivector to the exterior product of the multivectors.
     */
    ext2(a: I, b: I): M;
}
export = MutableGeometricElement;