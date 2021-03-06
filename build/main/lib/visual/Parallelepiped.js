"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BeginMode_1 = require("../core/BeginMode");
var Color_1 = require("../core/Color");
var exchange_1 = require("../base/exchange");
var Geometric3_1 = require("../math/Geometric3");
var GeometryArrays_1 = require("../core/GeometryArrays");
var Mesh_1 = require("../core/Mesh");
var refChange_1 = require("../core/refChange");
var ShaderMaterial_1 = require("../materials/ShaderMaterial");
var vertexShaderSrc = [
    "attribute vec3 aCoords;",
    "attribute float aFace;",
    "uniform vec3 a;",
    "uniform vec3 b;",
    "uniform vec3 c;",
    "uniform vec3 color0;",
    "uniform vec3 color1;",
    "uniform vec3 color2;",
    "uniform vec3 color3;",
    "uniform vec3 color4;",
    "uniform vec3 color5;",
    "uniform float uOpacity;",
    "uniform vec3 uPosition;",
    "uniform mat4 uModel;",
    "uniform mat4 uProjection;",
    "uniform mat4 uView;",
    "varying highp vec4 vColor;",
    "",
    "void main(void) {",
    "  vec3 X = aCoords.x * a + aCoords.y * b + aCoords.z * c;",
    "  gl_Position = uProjection * uView * uModel * vec4(X + uPosition, 1.0);",
    "  if (aFace == 0.0) {",
    "    vColor = vec4(color0, uOpacity);",
    "  }",
    "  if (aFace == 1.0) {",
    "    vColor = vec4(color1, uOpacity);",
    "  }",
    "  if (aFace == 2.0) {",
    "    vColor = vec4(color2, uOpacity);",
    "  }",
    "  if (aFace == 3.0) {",
    "    vColor = vec4(color3, uOpacity);",
    "  }",
    "  if (aFace == 4.0) {",
    "    vColor = vec4(color4, uOpacity);",
    "  }",
    "  if (aFace == 5.0) {",
    "    vColor = vec4(color5, uOpacity);",
    "  }",
    "}"
].join('\n');
var fragmentShaderSrc = [
    "precision mediump float;",
    "varying highp vec4 vColor;",
    "",
    "void main(void) {",
    "  gl_FragColor = vColor;",
    "}"
].join('\n');
/**
 * Coordinates of the cube vertices.
 */
var vertices = [
    [-0.5, -0.5, +0.5],
    [-0.5, +0.5, +0.5],
    [+0.5, +0.5, +0.5],
    [+0.5, -0.5, +0.5],
    [-0.5, -0.5, -0.5],
    [-0.5, +0.5, -0.5],
    [+0.5, +0.5, -0.5],
    [+0.5, -0.5, -0.5],
];
var aCoords = [];
var aFaces = [];
var ID = 'parallelepiped';
var NAME = 'Parallelepiped';
/**
 * Pushes positions and colors into the the aPositions and aColors arrays.
 * A quad call pushes two triangles, making a square face.
 * The dimensionality of each position is 3, but could be changed.
 * The first parameter, a, is used to pick the color of the entire face.
 */
function quad(a, b, c, d) {
    var indices = [a, b, c, a, c, d];
    for (var i = 0; i < indices.length; i++) {
        var vertex = vertices[indices[i]];
        var dims = vertex.length;
        for (var d_1 = 0; d_1 < dims; d_1++) {
            aCoords.push(vertex[d_1]);
        }
        aFaces.push(a - 1);
    }
}
quad(1, 0, 3, 2);
quad(2, 3, 7, 6);
quad(3, 0, 4, 7);
quad(6, 5, 1, 2);
quad(4, 5, 6, 7);
quad(5, 4, 0, 1);
var Parallelepiped = (function () {
    function Parallelepiped(contextManager, levelUp) {
        if (levelUp === void 0) { levelUp = 0; }
        this.levelUp = levelUp;
        this.opacity = 1;
        this.transparent = false;
        this.X = Geometric3_1.Geometric3.vector(0, 0, 0);
        /**
         *
         */
        this.a = Geometric3_1.Geometric3.vector(1, 0, 0);
        this.b = Geometric3_1.Geometric3.vector(0, 1, 0);
        this.c = Geometric3_1.Geometric3.vector(0, 0, 1);
        /**
         * Face colors
         * top    - 0
         * right  - 1
         * front  - 2
         * bottom - 3
         * left   - 4
         * back   - 5
         */
        this.colors = [];
        this.refCount = 0;
        this.contextManager = exchange_1.exchange(this.contextManager, contextManager);
        this.addRef();
        this.colors[0] = Color_1.Color.gray.clone();
        this.colors[1] = Color_1.Color.gray.clone();
        this.colors[2] = Color_1.Color.gray.clone();
        this.colors[3] = Color_1.Color.gray.clone();
        this.colors[4] = Color_1.Color.gray.clone();
        this.colors[5] = Color_1.Color.gray.clone();
        if (levelUp === 0) {
            this.contextManager.synchronize(this);
        }
    }
    Parallelepiped.prototype.destructor = function (levelUp) {
        if (levelUp === 0) {
            if (this.contextManager && this.contextManager.gl) {
                if (this.contextManager.gl.isContextLost()) {
                    this.contextLost();
                }
                else {
                    this.contextFree();
                }
            }
            else {
                // There is no contextProvider so resources should already be clean.
            }
        }
        this.mesh = exchange_1.exchange(this.mesh, void 0);
        this.contextManager = exchange_1.exchange(this.contextManager, void 0);
    };
    Parallelepiped.prototype.render = function (ambients) {
        if (this.mesh) {
            var material = this.mesh.material;
            material.use();
            material.getUniform('uOpacity').uniform1f(this.opacity);
            material.getUniform('uPosition').uniform3f(this.X.x, this.X.y, this.X.z);
            material.getUniform('a').uniform3f(this.a.x, this.a.y, this.a.z);
            material.getUniform('b').uniform3f(this.b.x, this.b.y, this.b.z);
            material.getUniform('c').uniform3f(this.c.x, this.c.y, this.c.z);
            for (var i = 0; i < this.colors.length; i++) {
                material.getUniform("color" + i).uniform3f(this.colors[i].r, this.colors[i].g, this.colors[i].b);
            }
            material.release();
            this.mesh.render(ambients);
        }
    };
    Parallelepiped.prototype.addRef = function () {
        refChange_1.refChange(ID, NAME, +1);
        this.refCount++;
        return this.refCount;
    };
    Parallelepiped.prototype.release = function () {
        refChange_1.refChange(ID, NAME, -1);
        this.refCount--;
        if (this.refCount === 0) {
            this.destructor(this.levelUp);
        }
        return this.refCount;
    };
    Parallelepiped.prototype.contextFree = function () {
        this.mesh = exchange_1.exchange(this.mesh, void 0);
    };
    Parallelepiped.prototype.contextGain = function () {
        if (!this.mesh) {
            var primitive = {
                mode: BeginMode_1.BeginMode.TRIANGLES,
                attributes: {
                    aCoords: { values: aCoords, size: 3 },
                    aFace: { values: aFaces, size: 1 }
                }
            };
            var geometry = new GeometryArrays_1.GeometryArrays(this.contextManager, primitive);
            // geometry.mode = BeginMode.TRIANGLES;
            // geometry.setAttribute('aCoords', { values: aCoords, size: 3, type: DataType.FLOAT });
            // geometry.setAttribute('aFace', { values: aFaces, size: 1, type: DataType.FLOAT });
            var material = new ShaderMaterial_1.ShaderMaterial(vertexShaderSrc, fragmentShaderSrc, [], this.contextManager);
            this.mesh = new Mesh_1.Mesh(geometry, material, this.contextManager, {}, 0);
            geometry.release();
            material.release();
        }
    };
    Parallelepiped.prototype.contextLost = function () {
        this.mesh = exchange_1.exchange(this.mesh, void 0);
    };
    return Parallelepiped;
}());
exports.Parallelepiped = Parallelepiped;
