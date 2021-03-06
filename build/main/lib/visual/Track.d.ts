import { ContextManager } from '../core/ContextManager';
import { Geometry } from '../core/Geometry';
import { LineMaterial } from '../materials/LineMaterial';
import { Material } from '../core/Material';
import { Matrix4 } from '../math/Matrix4';
import { Mesh } from '../core/Mesh';
import { VectorE3 } from '../math/VectorE3';
/**
 *
 */
export declare class TrackGeometry implements Geometry {
    private contextManager;
    scaling: Matrix4;
    private data;
    private count;
    private N;
    private dirty;
    private vbo;
    private refCount;
    constructor(contextManager: ContextManager);
    protected destructor(): void;
    bind(material: Material): TrackGeometry;
    unbind(material: Material): TrackGeometry;
    draw(): TrackGeometry;
    contextFree(): void;
    contextGain(): void;
    contextLost(): void;
    addRef(): number;
    release(): number;
    /**
     *
     */
    addPoint(x: number, y: number, z: number): void;
    /**
     *
     */
    erase(): void;
}
export interface TrackOptions {
    color?: {
        r: 0;
        g: 0;
        b: 0;
    };
}
/**
 *
 */
export declare class Track extends Mesh<TrackGeometry, LineMaterial> {
    constructor(contextManager: ContextManager, options?: TrackOptions, levelUp?: number);
    /**
     *
     */
    protected destructor(levelUp: number): void;
    /**
     *
     */
    addPoint(point: VectorE3): void;
    /**
     *
     */
    clear(): void;
}
