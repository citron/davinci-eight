import AttribMetaInfos = require('../core/AttribMetaInfos');
import Geometry = require('../geometries/Geometry');
import AttribProvider = require('../core/AttribProvider');
import ShaderVariableDecl = require('../core/ShaderVariableDecl');
import DataUsage = require('../core/DataUsage');
import DrawMode = require('../core/DrawMode');
/**
 * Adapter from a Geometry to a AttribProvider.
 * @class GeometryAdapter
 * @extends VertexAttributeProivider
 */
declare class GeometryAdapter implements AttribProvider {
    geometry: Geometry;
    private elementArray;
    private aVertexPositionArray;
    private aVertexNormalArray;
    private $drawMode;
    private elementsUsage;
    grayScale: boolean;
    private lines;
    private points;
    private positionVarName;
    private normalVarName;
    /**
     * @class GeometryAdapter
     * @constructor
     * @param geometry {Geometry} The geometry that must be adapted to a AttribProvider.
     */
    constructor(geometry: Geometry, options?: {
        drawMode?: DrawMode;
        elementsUsage?: DataUsage;
        positionVarName?: string;
        normalVarName?: string;
    });
    drawMode: DrawMode;
    draw(context: WebGLRenderingContext): void;
    dynamic: boolean;
    hasElementArray(): boolean;
    getElementArray(): {
        usage: DataUsage;
        data: Uint16Array;
    };
    getAttribArray(name: string): {
        usage: DataUsage;
        data: Float32Array;
    };
    getAttribMeta(): AttribMetaInfos;
    update(attributes: ShaderVariableDecl[]): void;
    private computeLines();
    private computePoints();
}
export = GeometryAdapter;
