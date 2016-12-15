import { canonicalAxis, canonicalMeridian } from '../core/tiltFromOptions';
import Geometric3 from '../math/Geometric3';
import { R3 } from '../math/R3';
import SpinorE3 from '../math/SpinorE3';
import vec from '../math/R3';
import VectorE3 from '../math/VectorE3';

/**
 * This function computes the reference meridian of an object.
 */
export default function referenceMeridian(options: { axis?: VectorE3; meridian?: VectorE3, tilt?: SpinorE3 }, fallback: VectorE3): R3 {
    if (options.tilt) {
        const meridian = Geometric3.fromVector(canonicalMeridian).rotate(options.tilt);
        return vec(meridian.x, meridian.y, meridian.z);
    }
    else if (options.meridian) {
        const meridian = options.meridian;
        return vec(meridian.x, meridian.y, meridian.z).direction();
    }
    else if (options.axis) {
        const B = Geometric3.dualOfVector(canonicalMeridian);
        const tilt = Geometric3.rotorFromVectorToVector(canonicalAxis, options.axis, B);
        const meridian = Geometric3.fromVector(canonicalMeridian).rotate(tilt);
        return vec(meridian.x, meridian.y, meridian.z).direction();
    }
    else {
        return vec(fallback.x, fallback.y, fallback.z);
    }
}
