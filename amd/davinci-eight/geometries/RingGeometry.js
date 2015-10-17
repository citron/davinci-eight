var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../geometries/arc3', '../geometries/Simplex', '../geometries/SliceGeometry', '../math/Spinor3', '../core/Symbolic', '../math/Vector2', '../math/Vector3'], function (require, exports, arc3, Simplex, SliceGeometry, Spinor3, Symbolic, Vector2, Vector3) {
    // TODO: If the Ring is closed (angle = 2 * PI) then we get some redundancy at the join.
    // TODO: If the innerRadius is zero then the quadrilaterals have degenerate triangles.
    // TODO: May be more efficient to calculate points for the outer circle then scale them inwards.
    /**
     *
     */
    function computeVertices(a, b, axis, start, angle, generator, radialSegments, thetaSegments, vertices, uvs) {
        /**
         * `t` is the vector perpendicular to s in the plane of the ring.
         * We could use the generator an PI / 4 to calculate this or the cross product as here.
         */
        var perp = Vector3.copy(axis).cross(start);
        /**
         * The distance of the vertex from the origin and center.
         */
        var radius = b;
        var radiusStep = (a - b) / radialSegments;
        for (var i = 0; i < radialSegments + 1; i++) {
            var begin = Vector3.copy(start).scale(radius);
            var arcPoints = arc3(begin, angle, generator, thetaSegments);
            for (var j = 0, jLength = arcPoints.length; j < jLength; j++) {
                var arcPoint = arcPoints[j];
                vertices.push(arcPoint);
                // The coordinates vary between -a and +a, which we map to 0 and 1.
                uvs.push(new Vector2([(arcPoint.dot(start) / a + 1) / 2, (arcPoint.dot(perp) / a + 1) / 2]));
            }
            radius += radiusStep;
        }
    }
    /**
     * Our traversal will generate the following mapping into the vertices and uvs arrays.
     * This is standard for two looping variables.
     */
    function vertexIndex(i, j, thetaSegments) {
        return i * (thetaSegments + 1) + j;
    }
    function makeTriangles(vertices, uvs, axis, radialSegments, thetaSegments, geometry) {
        for (var i = 0; i < radialSegments; i++) {
            // Our traversal has resulted in the following formula for the index
            // into the vertices or uvs array
            // vertexIndex(i, j) => i * (thetaSegments + 1) + j
            /**
             * The index along the start radial line where j = 0. This is just index(i,0)
             */
            var startLineIndex = i * (thetaSegments + 1);
            for (var j = 0; j < thetaSegments; j++) {
                /**
                 * The index of the corner of the quadrilateral with the lowest value of i and j.
                 * This corresponds to the smallest radius and smallest angle counterclockwise.
                 */
                var quadIndex = startLineIndex + j;
                var v0 = quadIndex;
                var v1 = quadIndex + thetaSegments + 1; // Move outwards one segment.
                var v2 = quadIndex + thetaSegments + 2; // Then move one segment along the radius.
                geometry.triangle([vertices[v0], vertices[v1], vertices[v2]], [axis, axis, axis], [uvs[v0].clone(), uvs[v1].clone(), uvs[v2].clone()]);
                v0 = quadIndex; // Start at the same corner
                v1 = quadIndex + thetaSegments + 2; // Move diagonally outwards and along radial
                v2 = quadIndex + 1; // Then move radially inwards
                geometry.triangle([vertices[v0], vertices[v1], vertices[v2]], [axis, axis, axis], [uvs[v0].clone(), uvs[v1].clone(), uvs[v2].clone()]);
            }
        }
    }
    function makeLineSegments(vertices, radialSegments, thetaSegments, data) {
        for (var i = 0; i < radialSegments; i++) {
            for (var j = 0; j < thetaSegments; j++) {
                var simplex = new Simplex(Simplex.K_FOR_LINE_SEGMENT);
                simplex.vertices[0].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(i, j, thetaSegments)];
                simplex.vertices[1].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(i, j + 1, thetaSegments)];
                data.push(simplex);
                var simplex = new Simplex(Simplex.K_FOR_LINE_SEGMENT);
                simplex.vertices[0].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(i, j, thetaSegments)];
                simplex.vertices[1].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(i + 1, j, thetaSegments)];
                data.push(simplex);
            }
            // TODO: We probably don't need these lines when the thing is closed 
            var simplex = new Simplex(Simplex.K_FOR_LINE_SEGMENT);
            simplex.vertices[0].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(i, thetaSegments, thetaSegments)];
            simplex.vertices[1].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(i + 1, thetaSegments, thetaSegments)];
            data.push(simplex);
        }
        // Lines for the outermost circle.
        for (var j = 0; j < thetaSegments; j++) {
            var simplex = new Simplex(Simplex.K_FOR_LINE_SEGMENT);
            simplex.vertices[0].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(radialSegments, j, thetaSegments)];
            simplex.vertices[1].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(radialSegments, j + 1, thetaSegments)];
            data.push(simplex);
        }
    }
    function makePoints(vertices, radialSegments, thetaSegments, data) {
        for (var i = 0; i <= radialSegments; i++) {
            for (var j = 0; j <= thetaSegments; j++) {
                var simplex = new Simplex(Simplex.K_FOR_POINT);
                simplex.vertices[0].attributes[Symbolic.ATTRIBUTE_POSITION] = vertices[vertexIndex(i, j, thetaSegments)];
                data.push(simplex);
            }
        }
    }
    function makeEmpty(vertices, radialSegments, thetaSegments, data) {
        for (var i = 0; i <= radialSegments; i++) {
            for (var j = 0; j <= thetaSegments; j++) {
                var simplex = new Simplex(Simplex.K_FOR_EMPTY);
                data.push(simplex);
            }
        }
    }
    /**
     * @class RingGeometry
     * @extends SliceGeometry
     */
    var RingGeometry = (function (_super) {
        __extends(RingGeometry, _super);
        /**
         * <p>
         * Creates an annulus with a single hole.
         * </p>
         * <p>
         * Sets the <code>sliceAngle</code> property to <code>2 * Math.PI</p>.
         * </p>
         * @class RingGeometry
         * @constructor
         * @param a [number = 1] The outer radius
         * @param b [number = 0] The inner radius
         * @param axis [Cartesian3] The <code>axis</code> property.
         * @param sliceStart [Cartesian3] The <code>sliceStart</code> property.
         * @param sliceAngle [number] The <code>sliceAngle</code> property.
         */
        function RingGeometry(a, b, axis, sliceStart, sliceAngle) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            _super.call(this, 'RingGeometry', axis, sliceStart, sliceAngle);
            this.a = a;
            this.b = b;
        }
        /**
         * @method destructor
         * @return {void}
         * @protected
         */
        RingGeometry.prototype.destructor = function () {
            _super.prototype.destructor.call(this);
        };
        /**
         * @method isModified
         * @return {boolean}
         */
        RingGeometry.prototype.isModified = function () {
            return _super.prototype.isModified.call(this);
        };
        /**
         * @method regenerate
         * @return {void}
         */
        RingGeometry.prototype.regenerate = function () {
            this.data = [];
            var radialSegments = this.flatSegments;
            var thetaSegments = this.curvedSegments;
            var generator = new Spinor3().dual(this.axis);
            var vertices = [];
            var uvs = [];
            computeVertices(this.a, this.b, this.axis, this.sliceStart, this.sliceAngle, generator, radialSegments, thetaSegments, vertices, uvs);
            switch (this.k) {
                case Simplex.K_FOR_EMPTY:
                    {
                        makeEmpty(vertices, radialSegments, thetaSegments, this.data);
                    }
                    break;
                case Simplex.K_FOR_POINT:
                    {
                        makePoints(vertices, radialSegments, thetaSegments, this.data);
                    }
                    break;
                case Simplex.K_FOR_LINE_SEGMENT:
                    {
                        makeLineSegments(vertices, radialSegments, thetaSegments, this.data);
                    }
                    break;
                case Simplex.K_FOR_TRIANGLE:
                    {
                        makeTriangles(vertices, uvs, this.axis, radialSegments, thetaSegments, this);
                    }
                    break;
                default: {
                    console.warn(this.k + "-simplex is not supported for geometry generation.");
                }
            }
            this.setModified(false);
        };
        /**
         * @method setModified
         * @param modified {boolean}
         * @return {RingGeometry}
         * @chainable
         */
        RingGeometry.prototype.setModified = function (modified) {
            _super.prototype.setModified.call(this, modified);
            return this;
        };
        return RingGeometry;
    })(SliceGeometry);
    return RingGeometry;
});