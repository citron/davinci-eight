import UniformColor = require('../uniforms/UniformColor');
import UniformVector3 = require('../uniforms/UniformVector3');
import UniformProvider = require('../core/UniformProvider');
import UniformMetaInfos = require('../core/UniformMetaInfos');
/**
 * Provides a uniform variable representing a point light.
 * @class PointLight
 */
declare class PointLight implements UniformProvider {
    private uColor;
    private uPosition;
    private multi;
    /**
     * @class PointLight
     * @constructor
     */
    constructor();
    color: UniformColor;
    position: UniformVector3;
    getUniformFloat(name: string): number;
    getUniformMatrix2(name: string): {
        transpose: boolean;
        matrix2: Float32Array;
    };
    getUniformMatrix3(name: string): {
        transpose: boolean;
        matrix3: Float32Array;
    };
    getUniformMatrix4(name: string): {
        transpose: boolean;
        matrix4: Float32Array;
    };
    getUniformVector2(name: string): number[];
    getUniformVector3(name: string): number[];
    getUniformVector4(name: string): number[];
    getUniformMetaInfos(): UniformMetaInfos;
}
export = PointLight;
