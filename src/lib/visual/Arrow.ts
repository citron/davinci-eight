import { ArrowOptions } from './ArrowOptions';
import { ArrowGeometry } from '../geometries/ArrowGeometry';
import { ArrowGeometryOptions } from '../geometries/ArrowGeometryOptions';
import { Color } from '../core/Color';
import { ContextManager } from '../core/ContextManager';
import { ds } from './Defaults';
import { referenceAxis } from '../core/referenceAxis';
import { referenceMeridian } from '../core/referenceMeridian';
import { Geometry } from '../core/Geometry';
import { isDefined } from '../checks/isDefined';
import { Material } from '../core/Material';
import { materialFromOptions } from './materialFromOptions';
import { mustBeNumber } from '../checks/mustBeNumber';
import { Mesh } from '../core/Mesh';
import { normVectorE3 } from '../math/normVectorE3';
import { offsetFromOptions } from './offsetFromOptions';
import { setAxisAndMeridian } from './setAxisAndMeridian';
import { setColorOption } from './setColorOption';
import { setDeprecatedOptions } from './setDeprecatedOptions';
import { SimplexMode } from '../geometries/SimplexMode';
import { simplexModeFromOptions } from './simplexModeFromOptions';
import { spinorE3Object } from './spinorE3Object';
import { vectorE3Object } from './vectorE3Object';
import { VectorE3 } from '../math/VectorE3';

/**
 * A Mesh in the form of an arrow that may be used to represent a vector quantity.
 */
export class Arrow extends Mesh<Geometry, Material> {
    /**
     * 
     */
    constructor(contextManager: ContextManager, options: ArrowOptions = {}, levelUp = 0) {
        super(void 0, void 0, contextManager, { axis: referenceAxis(options, ds.axis).direction(), meridian: referenceMeridian(options, ds.meridian).direction() }, levelUp + 1);
        this.setLoggingName('Arrow');

        const geoOptions: ArrowGeometryOptions = { kind: 'ArrowGeometry' };

        geoOptions.offset = offsetFromOptions(options);
        geoOptions.tilt = spinorE3Object(options.tilt);
        geoOptions.axis = vectorE3Object(referenceAxis(options, ds.axis).direction());
        geoOptions.meridian = vectorE3Object(referenceMeridian(options, ds.meridian).direction());

        geoOptions.radiusCone = 0.08;

        const cachedGeometry = contextManager.getCacheGeometry(geoOptions);
        if (cachedGeometry && cachedGeometry instanceof ArrowGeometry) {
            this.geometry = cachedGeometry;
            cachedGeometry.release();
        }
        else {
            const geometry = new ArrowGeometry(contextManager, geoOptions);
            this.geometry = geometry;
            geometry.release();
            contextManager.putCacheGeometry(geoOptions, geometry);
        }

        const material = materialFromOptions(contextManager, simplexModeFromOptions(options, SimplexMode.TRIANGLE), options);
        this.material = material;
        material.release();

        setAxisAndMeridian(this, options);
        setColorOption(this, options, Color.gray);
        setDeprecatedOptions(this, options);

        if (isDefined(options.length)) {
            this.length = mustBeNumber('length', options.length);
        }

        if (levelUp === 0) {
            this.synchUp();
        }
    }

    /**
     * 
     */
    protected destructor(levelUp: number): void {
        if (levelUp === 0) {
            this.cleanUp();
        }
        super.destructor(levelUp + 1);
    }

    /**
     * The vector that is represented by the Arrow.
     * 
     * magnitude(Arrow.vector) = Arrow.length
     * direction(Arrow.vector) = Arrow.axis
     * Arrow.vector = Arrow.length * Arrow.axis
     */
    get vector(): VectorE3 {
        return super.getAxis().scale(this.length);
    }
    set vector(axis: VectorE3) {
        this.length = normVectorE3(axis);
        // Don't try to set the direction for the zero vector.
        if (this.length !== 0) {
            this.setAxis(axis);
        }
    }

    /**
     * The length of the Arrow.
     * This property determines the scaling of the Arrow in all directions.
     */
    get length() {
        return this.getScaleX();
    }
    set length(length: number) {
        this.setScale(length, length, length);
    }
}
