import arc3 = require('../geometries/arc3')
import VectorE3 = require('../math/VectorE3')
import SimplexGeometry = require('../geometries/SimplexGeometry')
import Simplex = require('../geometries/Simplex')
import SliceSimplexGeometry = require('../geometries/SliceSimplexGeometry');
import MutableSpinorE3 = require('../math/MutableSpinorE3')
import SpinorE3 = require('../math/SpinorE3')
import Symbolic = require('../core/Symbolic')
import MutableVectorE2 = require('../math/MutableVectorE2')
import MutableVectorE3 = require('../math/MutableVectorE3')

// TODO: The caps don't have radial segments!

function computeVertices(radius: number, height: number, axis: VectorE3, start: VectorE3, angle: number, generator: SpinorE3, heightSegments: number, thetaSegments: number, points: MutableVectorE3[], vertices: number[][], uvs: MutableVectorE2[][]) {

    let begin = MutableVectorE3.copy(start).scale(radius)
    let halfHeight = MutableVectorE3.copy(axis).scale(0.5 * height)

    /**
     * A displacement in the direction of axis that we must move for each height step.
     */
    let stepH = MutableVectorE3.copy(axis).normalize().scale(height / heightSegments)

    for (var i = 0; i <= heightSegments; i++) {
        /**
         * The displacement to the current level.
         */
        let dispH = MutableVectorE3.copy(stepH).scale(i).sub(halfHeight)
        let verticesRow: number[] = [];
        let uvsRow: MutableVectorE2[] = [];
        /**
         * Interesting that the v coordinate is 1 at the base and 0 at the top!
         * This is because i originally went from top to bottom.
         */
        let v = (heightSegments - i) / heightSegments
        /**
         * arcPoints.length => thetaSegments + 1
         */
        var arcPoints = arc3(begin, angle, generator, thetaSegments)
        /**
         * j < arcPoints.length => j <= thetaSegments
         */
        for (var j = 0, jLength = arcPoints.length; j < jLength; j++) {
            var point = arcPoints[j].add(dispH)
            /**
             * u will vary from 0 to 1, because j goes from 0 to thetaSegments
             */
            let u = j / thetaSegments;
            points.push(point);
            verticesRow.push(points.length - 1);
            uvsRow.push(new MutableVectorE2([u, v]));
        }
        vertices.push(verticesRow);
        uvs.push(uvsRow);
    }

}

/**
 * @class CylinderSimplexGeometry
 * @extends SliceSimplexGeometry
 */
class CylinderSimplexGeometry extends SliceSimplexGeometry {
    public radius: number;
    public height: number;
    public openTop: boolean;
    public openBottom: boolean;
    /**
     * <p>
     * Constructs a Cylindrical Shell.
     * </p>
     * <p>
     * Sets the <code>sliceAngle</code> property to <code>2 * Math.PI</p>.
     * </p>
     * @class CylinderSimplexGeometry
     * @constructor
     * @param radius [number = 1]
     * @param height [number = 1]
     * @param axis [VectorE3 = MutableVectorE3.e2]
     * @param openTop [boolean = false]
     * @param openBottom [boolean = false]
     */
    constructor(
        radius: number = 1,
        height: number = 1,
        axis: VectorE3 = MutableVectorE3.e2,
        openTop: boolean = false,
        openBottom: boolean = false
    ) {
        super('CylinderSimplexGeometry', axis, void 0, void 0)
        this.radius = radius
        this.height = height
        this.openTop = openTop
        this.openBottom = openBottom
        this.setModified(true)
    }
    public regenerate(): void {
        this.data = []
        let radius = this.radius
        //let height = this.height
        let heightSegments = this.flatSegments
        let thetaSegments = this.curvedSegments
        var generator: SpinorE3 = new MutableSpinorE3().dual(this.axis)

        let heightHalf = this.height / 2;

        var points: MutableVectorE3[] = [];
        // The double array allows us to manage the i,j indexing more naturally.
        // The alternative is to use an indexing function.
        let vertices: number[][] = [];
        let uvs: MutableVectorE2[][] = [];

        computeVertices(radius, this.height, this.axis, this.sliceStart, this.sliceAngle, generator, heightSegments, thetaSegments, points, vertices, uvs)

        var na: MutableVectorE3;
        var nb: MutableVectorE3;
        // sides
        for (let j = 0; j < thetaSegments; j++) {
            if (radius !== 0) {
                na = MutableVectorE3.copy(points[vertices[0][j]]);
                nb = MutableVectorE3.copy(points[vertices[0][j + 1]]);
            }
            else {
                na = MutableVectorE3.copy(points[vertices[1][j]]);
                nb = MutableVectorE3.copy(points[vertices[1][j + 1]]);
            }
            // FIXME: This isn't geometric.
            na.setY(0).normalize();
            nb.setY(0).normalize();
            for (let i = 0; i < heightSegments; i++) {
                /**
                 *  2-------3
                 *  |       | 
                 *  |       |
                 *  |       |
                 *  1-------4
                 */
                let v1: number = vertices[i][j];
                let v2: number = vertices[i + 1][j];
                let v3: number = vertices[i + 1][j + 1];
                let v4: number = vertices[i][j + 1];
                // The normals for 1 and 2 are the same.
                // The normals for 3 and 4 are the same.
                let n1 = na.clone();
                let n2 = na.clone();
                let n3 = nb.clone();
                let n4 = nb.clone();
                let uv1 = uvs[i][j].clone();
                let uv2 = uvs[i + 1][j].clone();
                let uv3 = uvs[i + 1][j + 1].clone();
                let uv4 = uvs[i][j + 1].clone()
                this.triangle([points[v2], points[v1], points[v3]], [n2, n1, n3], [uv2, uv1, uv3])
                this.triangle([points[v4], points[v3], points[v1]], [n4, n3.clone(), n1.clone()], [uv4, uv3.clone(), uv1.clone()])
            }
        }

        // top cap
        if (!this.openTop && radius > 0) {
            // Push an extra point for the center of the top.
            points.push(this.axis.clone().scale(heightHalf));
            for (let j = 0; j < thetaSegments; j++) {
                let v1: number = vertices[heightSegments][j + 1];
                let v2: number = points.length - 1;
                let v3: number = vertices[heightSegments][j];
                let n1: MutableVectorE3 = this.axis.clone();
                let n2: MutableVectorE3 = this.axis.clone();
                let n3: MutableVectorE3 = this.axis.clone();
                let uv1: MutableVectorE2 = uvs[heightSegments][j + 1].clone();
                // Check this
                let uv2: MutableVectorE2 = new MutableVectorE2([uv1.x, 1]);
                let uv3: MutableVectorE2 = uvs[heightSegments][j].clone();
                this.triangle([points[v1], points[v2], points[v3]], [n1, n2, n3], [uv1, uv2, uv3])
            }
        }

        // bottom cap
        if (!this.openBottom && radius > 0) {
            // Push an extra point for the center of the bottom.
            points.push(this.axis.clone().scale(-heightHalf))
            for (let j = 0; j < thetaSegments; j++) {
                let v1: number = vertices[0][j]
                let v2: number = points.length - 1
                let v3: number = vertices[0][j + 1]
                let n1: MutableVectorE3 = this.axis.clone().scale(-1)
                let n2: MutableVectorE3 = this.axis.clone().scale(-1)
                let n3: MutableVectorE3 = this.axis.clone().scale(-1)
                let uv1: MutableVectorE2 = uvs[0][j].clone()
                // TODO: Check this
                let uv2: MutableVectorE2 = new MutableVectorE2([uv1.x, 1])
                let uv3: MutableVectorE2 = uvs[0][j + 1].clone()
                this.triangle([points[v1], points[v2], points[v3]], [n1, n2, n3], [uv1, uv2, uv3])
            }
        }
        //    this.computeFaceNormals();
        //    this.computeVertexNormals();
        this.setModified(false)
    }
}

export = CylinderSimplexGeometry;
