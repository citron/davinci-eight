import Curve = require('../curves/Curve')
import Euclidean3 = require('../math/Euclidean3')

class QuadraticBezierCurve extends Curve {
    beginPoint: Euclidean3;
    controlPoint: Euclidean3;
    endPoint: Euclidean3;
    constructor(beginPoint: Euclidean3, controlPoint: Euclidean3, endPoint: Euclidean3) {
        super()
        this.beginPoint = beginPoint
        this.controlPoint = controlPoint
        this.endPoint = endPoint
    }
    getPoint(t: number): Euclidean3 {
        return this.beginPoint.quadraticBezier(t, this.controlPoint, this.endPoint)
    }
}
export = QuadraticBezierCurve