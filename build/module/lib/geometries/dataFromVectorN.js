import { Geometric2 } from '../math/Geometric2';
import { Geometric3 } from '../math/Geometric3';
import { Vector2 } from '../math/Vector2';
import { Vector3 } from '../math/Vector3';
/**
 * This seems a bit hacky. Maybe we need an abstraction that recognizes the existence of
 * geometric numbers for vertex attributes, but allows us to extract the vector (grade-1) part?
 */
export function dataFromVectorN(source) {
    if (source instanceof Geometric3) {
        var g3 = source;
        return [g3.x, g3.y, g3.z];
    }
    else if (source instanceof Geometric2) {
        var g2 = source;
        return [g2.x, g2.y];
    }
    else if (source instanceof Vector3) {
        var v3 = source;
        return [v3.x, v3.y, v3.z];
    }
    else if (source instanceof Vector2) {
        var v2 = source;
        return [v2.x, v2.y];
    }
    else {
        // console.warn("dataFromVectorN(source: VectorN<number>): number[], source.length => " + source.length)
        return source.toArray();
    }
}
