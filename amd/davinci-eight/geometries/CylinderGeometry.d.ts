import Cartesian3 = require('../math/Cartesian3');
import SliceGeometry = require('../geometries/SliceGeometry');
/**
 * @class CylinderGeometry
 * @extends SliceGeometry
 */
declare class CylinderGeometry extends SliceGeometry {
    radius: number;
    height: number;
    openTop: boolean;
    openBottom: boolean;
    /**
     * <p>
     * Constructs a Cylindrical Shell.
     * </p>
     * <p>
     * Sets the <code>sliceAngle</code> property to <code>2 * Math.PI</p>.
     * </p>
     * @class CylinderGeometry
     * @constructor
     * @param radius [number = 1]
     * @param height [number = 1]
     * @param axis [Cartesian3 = Vector3.e2]
     * @param openTop [boolean = false]
     * @param openBottom [boolean = false]
     */
    constructor(radius?: number, height?: number, axis?: Cartesian3, openTop?: boolean, openBottom?: boolean);
    regenerate(): void;
}
export = CylinderGeometry;