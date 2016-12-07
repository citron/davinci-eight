import GeometryMode from './GeometryMode';
import GeometryOptions from './GeometryOptions';
import VectorE3 from '../math/VectorE3';

interface GridGeometryOptions extends GeometryOptions {
    /**
     * A parametric function determining the vertex positions.
     */
    aPosition?: (u: number, v: number) => VectorE3;
    /**
     * A parametric function determining the vertex normals.
     */
    aNormal?: (u: number, v: number) => VectorE3;
    /**
     * A parametric function determining the vertex colors.
     */
    aColor?: (u: number, v: number) => { r: number; g: number; b: number };
    /**
     * A parametric function determining the vertex colors.
     */
    aCoords?: (u: number, v: number) => { u: number; v: number };
    /**
     * @default WIRE
     */
    mode?: GeometryMode;
    /**
     * @default 0
     */
    uMin?: number;
    /**
     * @default 1
     */
    uMax?: number;
    /**
     * @default 1
     */
    uSegments?: number;
    /**
     *
     */
    uClosed?: boolean;
    /**
     * @default 0
     */
    vMin?: number;
    /**
     * @default 1
     */
    vMax?: number;
    /**
     * @default 1
     */
    vSegments?: number;
    /**
     * 
     */
    vClosed?: boolean;
}

export default GridGeometryOptions;
