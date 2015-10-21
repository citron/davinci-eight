import VectorE3 = require('../math/VectorE3');
import IAxialGeometry = require('../geometries/IAxialGeometry');
import MutableNumber = require('../math/MutableNumber');
import SliceSimplexGeometry = require('../geometries/SliceSimplexGeometry');
import MutableVectorE3 = require('../math/MutableVectorE3');
/**
 * @class SphericalPolarSimplexGeometry
 * @extends SliceSimplexGeometry
 */
declare class SphericalPolarSimplexGeometry extends SliceSimplexGeometry implements IAxialGeometry<SphericalPolarSimplexGeometry> {
    /**
     * @property _radius
     * @type {MutableNumber}
     * @private
     */
    _radius: MutableNumber;
    /**
     * @property thetaLength
     * @type {number}
     */
    thetaLength: number;
    /**
     * Defines a start angle relative to the <code>axis</code> property.
     * @property thetaStart
     * @type {number}
     */
    thetaStart: number;
    /**
     * Constructs a geometry consisting of triangular simplices based on spherical coordinates.
     * @class SphericalPolarSimplexGeometry
     * @constructor
     * @param radius [number = 1]
     * @param axis [VectorE3]
     * @param phiStart [vectorE3]
     * @param phiLength [number = 2 * Math.PI]
     * @param thetaStart [number]
     * @param thetaLength [number]
     */
    constructor(radius: number, axis: VectorE3, phiStart: VectorE3, phiLength?: number, thetaStart?: number, thetaLength?: number);
    /**
     * @method destructor
     * @return {void}
     * @protected
     */
    protected destructor(): void;
    /**
     * @property radius
     * @type {number}
     */
    radius: number;
    /**
     * @property phiLength
     * @type {number}
     */
    phiLength: number;
    /**
     * Defines a start half-plane relative to the <code>axis</code> property.
     * @property phiStart
     * @type {MutableVectorE3}
     */
    phiStart: MutableVectorE3;
    /**
     * @method setAxis
     * @param axis {VectorE3}
     * @return {SphericalPolarSimplexGeometry}
     * @chainable
     */
    setAxis(axis: VectorE3): SphericalPolarSimplexGeometry;
    /**
     * @method setPosition
     * @param position {VectorE3}
     * @return {SphericalPolarSimplexGeometry}
     * @chainable
     */
    setPosition(position: VectorE3): SphericalPolarSimplexGeometry;
    enableTextureCoords(enable: boolean): SphericalPolarSimplexGeometry;
    /**
     * @method isModified
     * @return {boolean}
     */
    isModified(): boolean;
    /**
     * @method setModified
     * @param modified {boolean}
     * @return {SphericalPolarSimplexGeometry}
     * @chainable
     */
    setModified(modified: boolean): SphericalPolarSimplexGeometry;
    /**
     * @method regenerate
     * @return {void}
     */
    regenerate(): void;
}
export = SphericalPolarSimplexGeometry;
