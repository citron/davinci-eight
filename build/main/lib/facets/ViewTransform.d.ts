import { Geometric3 } from '../math/Geometric3';
import { Facet } from '../core/Facet';
import { FacetVisitor } from '../core/FacetVisitor';
/**
 *
 */
export declare class ViewTransform implements Facet {
    /**
     *
     */
    private _eye;
    /**
     *
     */
    private _look;
    /**
     *
     */
    private _up;
    /**
     *
     */
    private matrix;
    /**
     *
     */
    private matrixName;
    /**
     *
     */
    constructor();
    /**
     *
     */
    cameraToWorldCoords(cameraCoords: number[]): Geometric3;
    /**
     *
     */
    setUniforms(visitor: FacetVisitor): void;
    /**
     * The position of the camera, a vector.
     */
    eye: Geometric3;
    /**
     * The point that is being looked at.
     */
    look: Geometric3;
    /**
     * The approximate up direction.
     */
    up: Geometric3;
}
