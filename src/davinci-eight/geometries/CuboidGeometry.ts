import DrawPrimitive = require('../geometries/DrawPrimitive')
import Euclidean3 = require('../math/Euclidean3')
import GridTopology = require('../topologies/GridTopology')
import Geometry = require('../geometries/Geometry')
import IGeometry = require('../geometries/IGeometry')
import mustBeBoolean = require('../checks/mustBeBoolean')
import mustBeNumber = require('../checks/mustBeNumber')
import R3 = require('../math/R3')
import Symbolic = require('../core/Symbolic')
import R2 = require('../math/R2')
import VectorE3 = require('../math/VectorE3')

function side(basis: R3[], uSegments: number, vSegments: number): GridTopology {
    var normal = R3.copy(basis[0]).cross(basis[1]).normalize()
    var aNeg = R3.copy(basis[0]).scale(-0.5)
    var aPos = R3.copy(basis[0]).scale(+0.5)
    var bNeg = R3.copy(basis[1]).scale(-0.5)
    var bPos = R3.copy(basis[1]).scale(+0.5)
    var cPos = R3.copy(basis[2]).scale(+0.5)
    var side = new GridTopology(uSegments, vSegments)
    for (var uIndex = 0; uIndex < side.uLength; uIndex++) {
        for (var vIndex = 0; vIndex < side.vLength; vIndex++) {
            var u = uIndex / uSegments
            var v = vIndex / vSegments
            var a = R3.copy(aNeg).lerp(aPos, u)
            var b = R3.copy(bNeg).lerp(bPos, v)
            var vertex = side.vertex(uIndex, vIndex)
            vertex.attributes[Symbolic.ATTRIBUTE_POSITION] = R3.copy(a).add(b).add(cPos)
            vertex.attributes[Symbolic.ATTRIBUTE_NORMAL] = normal
            vertex.attributes[Symbolic.ATTRIBUTE_TEXTURE_COORDS] = new R2([u, v])
        }
    }
    return side
}

/**
 * @class CuboidGeometry
 */
class CuboidGeometry extends Geometry implements IGeometry<CuboidGeometry> {
    public iSegments: number = 1;
    public jSegments: number = 1;
    public kSegments: number = 1;
    private _a: R3 = R3.copy(Euclidean3.e1);
    private _b: R3 = R3.copy(Euclidean3.e2);
    private _c: R3 = R3.copy(Euclidean3.e3);
    private sides: GridTopology[];
    /**
     * @class CuboidGeometry
     * @constructor
     */
    constructor() {
        super()
        this.sides = []
    }
    /**
     * @property width
     * @type {number}
     */
    get width() {
        return this._a.magnitude()
    }
    set width(width: number) {
        mustBeNumber('width', width)
        this._a.normalize().scale(width)
    }
    /**
     * @property height
     * @type {number}
     */
    get height() {
        return this._b.magnitude()
    }
    set height(height: number) {
        mustBeNumber('height', height)
        this._b.normalize().scale(height)
    }
    /**
     * @property depth
     * @type {number}
     */
    get depth() {
        return this._c.magnitude()
    }
    set depth(depth: number) {
        mustBeNumber('depth', depth)
        this._c.normalize().scale(depth)
    }
    private regenerate(): void {
        this.sides = []
        // front
        this.sides.push(side([this._a, this._b, this._c], this.iSegments, this.jSegments))
        // right
        this.sides.push(side([R3.copy(this._c).scale(-1), this._b, this._a], this.kSegments, this.jSegments))
        // left
        this.sides.push(side([this._c, this._b, R3.copy(this._a).scale(-1)], this.kSegments, this.jSegments))
        // back
        this.sides.push(side([R3.copy(this._a).scale(-1), this._b, R3.copy(this._c).scale(-1)], this.iSegments, this.jSegments))
        // top
        this.sides.push(side([this._a, R3.copy(this._c).scale(-1), this._b], this.iSegments, this.kSegments))
        // bottom
        this.sides.push(side([this._a, this._c, R3.copy(this._b).scale(-1)], this.iSegments, this.kSegments))
    }
    /**
     * @method setPosition
     * @param position {VectorE3}
     * @return {CuboidGeometry}
     */
    public setPosition(position: VectorE3): CuboidGeometry {
        super.setPosition(position)
        return this
    }
    /**
     * @method toPrimitives
     * @return {DrawPrimitive[]}
     */
    public toPrimitives(): DrawPrimitive[] {
        this.regenerate()
        return this.sides.map((side) => { return side.toDrawPrimitive() })
    }
    enableTextureCoords(enable: boolean): CuboidGeometry {
        super.enableTextureCoords(enable)
        return this
    }
}
export = CuboidGeometry