import BeginMode from '../core/BeginMode';
import Color from '../core/Color';
import ContextManager from '../core/ContextManager';
import DataType from '../core/DataType';
import { ds } from './Defaults';
import Geometry from '../core/Geometry';
import Geometric3 from '../math/Geometric3';
import GeometryArrays from '../core/GeometryArrays';
import GeometryKey from '../core/GeometryKey';
import GPS from '../core/GraphicsProgramSymbols';
import Material from '../core/Material';
import materialFromOptions from './materialFromOptions';
import Mesh from '../core/Mesh';
import offsetFromOptions from './offsetFromOptions';
import Primitive from '../core/Primitive';
import setAxisAndMeridian from './setAxisAndMeridian';
import setColorOption from './setColorOption';
import SimplexMode from '../geometries/SimplexMode';
import simplexModeFromOptions from './simplexModeFromOptions';
import SpinorE3 from '../math/SpinorE3';
import tiltFromOptions from './tiltFromOptions';
import vec from '../math/R3';
import VectorE3 from '../math/VectorE3';

const NOSE = [0, +1, 0];
const LLEG = [-1, -1, 0];
const RLEG = [+1, -1, 0];
const TAIL = [0, -1, 0];
const CENTER = [0, 0, 0];
const LEFT = [-0.5, 0, 0];

const canonicalAxis = vec(0, 0, 1);

function concat<T>(a: T[], b: T[]) { return a.concat(b); }

/**
 * Transform a list of points by applying a tilt rotation and an offset translation.
 */
function transform(xs: number[][], options: { tilt?: SpinorE3, offset?: VectorE3 }): number[][] {
    if (options.tilt || options.offset) {
        const points = xs.map(function (coords) { return Geometric3.vector(coords[0], coords[1], coords[2]); });
        if (options.tilt) {
            points.forEach(function (point) {
                point.rotate(options.tilt);
            });
        }
        if (options.offset) {
            points.forEach(function (point) {
                point.addVector(options.offset);
            });
        }
        return points.map(function (point) { return [point.x, point.y, point.z]; });
    }
    else {
        return xs;
    }
}

/**
 * Creates the Turtle Primitive.
 * All points lie in the the plane z = 0.
 * The height and width of the triangle are centered on the origin (0, 0).
 * The height and width range from -1 to +1.
 */
function primitive(options: { tilt?: SpinorE3, offset?: VectorE3 }): Primitive {
    const values = transform([CENTER, LEFT, CENTER, TAIL, NOSE, LLEG, NOSE, RLEG, LLEG, RLEG], options).reduce(concat);
    const result: Primitive = {
        mode: BeginMode.LINES,
        attributes: {}
    };
    result.attributes[GPS.ATTRIBUTE_POSITION] = { values, size: 3, type: DataType.FLOAT };
    return result;
}

interface TurtleGeometryOptions extends GeometryKey {
    tilt?: SpinorE3;
    offset?: VectorE3;
}

/**
 * The geometry of the Bug is static so we use the conventional
 * approach based upon GeometryArrays
 */
class TurtleGeometry extends GeometryArrays {
    /**
     * 
     */
    constructor(contextManager: ContextManager, options: TurtleGeometryOptions = { kind: 'TurtleGeometry' }, levelUp = 0) {
        super(contextManager, primitive(options), options);
        this.setLoggingName('TurtleGeometry');
        if (levelUp === 0) {
            this.synchUp();
        }
    }
    /**
     * 
     */
    protected resurrector(levelUp: number): void {
        super.resurrector(levelUp + 1);
        this.setLoggingName('TurtleGeometry');
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
}

export interface TurtleOptions {
    color?: { r: number; g: number; b: number };
    tilt?: SpinorE3;
}

/**
 * A 3D visual representation of a turtle.
 */
export default class Turtle extends Mesh<Geometry, Material> {
    constructor(contextManager: ContextManager, options: TurtleOptions = {}, levelUp = 0) {
        super(void 0, void 0, contextManager, { axis: ds.axis, meridian: ds.meridian }, levelUp + 1);
        this.setLoggingName('Turtle');
        const geoOptions: TurtleGeometryOptions = { kind: 'TurtleGeometry' };
        geoOptions.tilt = tiltFromOptions(options, canonicalAxis);
        geoOptions.offset = offsetFromOptions(options);

        const cachedGeometry = contextManager.getCacheGeometry(geoOptions);
        if (cachedGeometry && cachedGeometry instanceof TurtleGeometry) {
            this.geometry = cachedGeometry;
            cachedGeometry.release();
        }
        else {
            const geometry = new TurtleGeometry(contextManager, geoOptions);
            this.geometry = geometry;
            geometry.release();
            contextManager.putCacheGeometry(geoOptions, geometry);
        }

        const material = materialFromOptions(contextManager, simplexModeFromOptions(options, SimplexMode.LINE), options);
        this.material = material;
        material.release();

        this.height = 0.1;
        this.width = 0.0618;

        setAxisAndMeridian(this, options);
        setColorOption(this, options, Color.gray);

        if (levelUp === 0) {
            this.synchUp();
        }
    }

    protected destructor(levelUp: number): void {
        if (levelUp === 0) {
            this.cleanUp();
        }
        super.destructor(levelUp + 1);
    }

    get width() {
        return this.getScaleX();
    }
    set width(width: number) {
        const y = this.getScaleY();
        const z = this.getScaleZ();
        this.setScale(width, y, z);
    }

    /**
     *
     */
    get height() {
        return this.getScaleY();
    }
    set height(height: number) {
        const x = this.getScaleX();
        const z = this.getScaleZ();
        this.setScale(x, height, z);
    }
}
