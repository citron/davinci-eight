import * as tslib_1 from "tslib";
// import generateTextShapes from '../geometries/generateTextShapes';
// import ExtrudeSimplexGeometry from '../geometries/ExtrudeSimplexGeometry')
import { SimplexPrimitivesBuilder } from '../geometries/SimplexPrimitivesBuilder';
/*
function futzParameters(parameters: { amount?: number; bevelEnabled?: boolean, bevelSize?: number, bevelThickness?: number; height?: number }) {

    parameters.amount = parameters.height !== undefined ? parameters.height : 50

    // defaults

    if (parameters.bevelThickness === undefined) parameters.bevelThickness = 10
    if (parameters.bevelSize === undefined) parameters.bevelSize = 8
    if (parameters.bevelEnabled === undefined) parameters.bevelEnabled = false

    return parameters
}
*/
var TextSimplexGeometry = (function (_super) {
    tslib_1.__extends(TextSimplexGeometry, _super);
    function TextSimplexGeometry(text, face, parameters) {
        return _super.call(this) || this;
        // var shapes = generateTextShapes(text, face, parameters)
        //    super(generateTextShapes(text, parameters), parameters, 'TextSimplexGeometry')
    }
    return TextSimplexGeometry;
}(/*Extrude*/ SimplexPrimitivesBuilder));
export { TextSimplexGeometry };
