import Geometry from '../core/Geometry'
import Primitive from '../core/Primitive'
import Spinor3 from '../math/Spinor3'
import Vector3 from '../math/Vector3'
import VertexArrays from '../core/VertexArrays'

/**
 * @class GeometryBuilder
 */
interface GeometryBuilder {

    /**
     * @property stress
     * @type Vector3
     */
    stress: Vector3

    /**
     * @property tilt
     * @type Spinor3
     */
    tilt: Spinor3

    /**
     * @property offset
     * @type Vector3
     */
    offset: Vector3

    /**
     * @method toGeometry
     * @return {Geometry}
     */
    toGeometry(): Geometry

    /**
     * @method toPrimitives
     * @return {Primitive[]}
     */
    toPrimitives(): Primitive[]

    /**
     * @method toVertexArrays
     * @return {VertexArrays[]}
     */
    toVertexArrays(): VertexArrays[]
}

export default GeometryBuilder