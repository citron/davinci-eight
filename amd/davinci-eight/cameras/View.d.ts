import IFacet = require('../core/IFacet');
import Vector3 = require('../math/Vector3');
import Cartesian3 = require('../math/Cartesian3');
/**
 * @class View
 */
interface View extends IFacet {
    /**
     * @property eye
     * @type Vector3
     */
    eye: Vector3;
    /**
     * @property look
     * @type Vector3
     */
    look: Vector3;
    /**
     * @property up
     * @type Vector3
     */
    up: Vector3;
    /**
     * Convenience method for setting the eye property allowing chainable method calls.
     * @method setEye
     * @param eye {Cartesian3}
     */
    setEye(eye: Cartesian3): View;
    /**
     * Convenience method for setting the look property allowing chainable method calls.
     * @method setLook
     * @param look {Cartesian3}
     */
    setLook(look: Cartesian3): View;
    /**
     * Convenience method for setting the up property allowing chainable method calls.
     * @method setUp
     * @param up {Cartesian3}
     */
    setUp(up: Cartesian3): View;
}
export = View;
