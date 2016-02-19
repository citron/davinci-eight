import View from './View';
import VectorE3 from '../math/VectorE3';
import Matrix4 from '../math/Matrix4';

/**
 * @class Perspective
 * @extends View
 */
interface Perspective extends View {
    /**
     * @property fov
     * @type number
     */
    fov: number;
    /**
     * @property aspect
     * @type number
     */
    aspect: number;
    /**
     * @property near
     * @type number
     */
    near: number;
    /**
     * @property far
     * @type number
     */
    far: number;
    /**
     *
     */
    projectionMatrix: Matrix4
    /**
     * Convenience method for setting the fov property allowing chainable method calls.
     * @method setFov
     * @param fov {number}
     */
    setFov(fov: number): Perspective;
    /**
     * Convenience method for setting the aspect property allowing chainable method calls.
     * @method setAspect
     * @param aspect {number}
     */
    setAspect(aspect: number): Perspective;
    /**
     * Convenience method for setting the near property allowing chainable method calls.
     * @method setNear
     * @param near {number}
     */
    setNear(near: number): Perspective;
    /**
     * Convenience method for setting the far property allowing chainable method calls.
     * @method setFar
     * @param far {number}
     */
    setFar(far: number): Perspective;
    /**
     * Convenience method for setting the eye property allowing chainable method calls.
     * @method setEye
     * @param eye {VectorE3}
     */
    setEye(eye: VectorE3): Perspective;
    /**
     * Convenience method for setting the look property allowing chainable method calls.
     * @method setLook
     * @param look {VectorE3}
     */
    setLook(look: VectorE3): Perspective;
    /**
     * Convenience method for setting the up property allowing chainable method calls.
     * @method setUp
     * @param up {VectorE3}
     */
    setUp(up: VectorE3): Perspective;
}

export default Perspective;
