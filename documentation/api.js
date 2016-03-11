YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "AbstractColor",
        "AbstractDrawable",
        "AbstractMatrix",
        "AbstractMesh",
        "AmbientLight",
        "Approximation",
        "Arrow",
        "ArrowBuilder",
        "ArrowGeometry",
        "ArrowGeometryOptions",
        "ArrowOptions",
        "AttribLocation",
        "AttribMetaInfo",
        "Attribute",
        "AxialPrimitivesBuilder",
        "BlendFactor",
        "Box",
        "BoxGeometry",
        "BoxGeometryOptions",
        "BoxOptions",
        "CC",
        "CameraControls",
        "Capability",
        "Color",
        "ColorFacet",
        "ConeTransform",
        "ConicalShellBuilder",
        "ContextAttributesLogger",
        "ContextConsumer",
        "ContextProgramConsumer",
        "ContextProvider",
        "Coords",
        "CoordsTransform1D",
        "CoordsTransform2D",
        "CuboidPrimitivesBuilder",
        "Curve",
        "CurveGeometry",
        "CurveOptions",
        "CurvePrimitive",
        "Cylinder",
        "CylinderBuilder",
        "CylinderGeometry",
        "CylinderGeometryOptions",
        "CylinderOptions",
        "CylinderTransform",
        "CylindricalShellBuilder",
        "Dimensions",
        "Direction",
        "DirectionalLight",
        "DrawMode",
        "Drawable",
        "Duality",
        "EIGHTLogger",
        "Engine",
        "ErrorMode",
        "Facet",
        "FacetVisitor",
        "Frustum",
        "G2",
        "G3",
        "Geometric2",
        "Geometric3",
        "GeometricE2",
        "GeometricE3",
        "Geometry",
        "GeometryArrays",
        "GeometryBuilder",
        "GeometryContainer",
        "GeometryElements",
        "GeometryLeaf",
        "GeometryOptions",
        "GeometryPrimitive",
        "GraphicsProgramSymbols",
        "Grid",
        "GridGeometry",
        "GridLines",
        "GridOptions",
        "GridPoints",
        "GridPrimitive",
        "GridTriangleStrip",
        "HTMLScriptsMaterial",
        "IndexBuffer",
        "LineMaterial",
        "LineMaterialOptions",
        "LinePoints",
        "LineStrip",
        "Material",
        "MaterialBase",
        "MaterialOptions",
        "Matrix2",
        "Matrix3",
        "Matrix4",
        "Mesh",
        "MeshMaterial",
        "MeshMaterialOptions",
        "MeshNormalMaterial",
        "ModelE2",
        "ModelE3",
        "ModelFacet",
        "MouseControls",
        "Mutable",
        "NumberShareableMap",
        "Perspective",
        "PerspectiveCamera",
        "PointMaterial",
        "PointMaterialOptions",
        "PointSizeFacet",
        "Primitive",
        "PrimitiveBuffers",
        "PrimitivesBuilder",
        "Pseudo",
        "QQ",
        "R3",
        "ReflectionFacetE2",
        "ReflectionFacetE3",
        "RigidBody",
        "RigidBodyWithUnits",
        "RingBuilder",
        "RingTransform",
        "Rotation",
        "Scalar",
        "Scaling",
        "Scene",
        "Shareable",
        "ShareableArray",
        "ShareableBase",
        "ShareableContextConsumer",
        "ShareableWebGLShader",
        "ShareableWebGLTexture",
        "SimplexPrimitivesBuilder",
        "SliceSimplexPrimitivesBuilder",
        "Sphere",
        "SphereBuilder",
        "SphereGeometry",
        "SphereOptions",
        "Spinor2",
        "Spinor3",
        "SpinorE1",
        "SpinorE2",
        "SpinorE3",
        "SpinorE4",
        "StringShareableMap",
        "Tetrahedron",
        "TetrahedronGeometry",
        "TetrahedronGeometryOptions",
        "TetrahedronOptions",
        "Trail",
        "TrailConfig",
        "Transform",
        "Translation",
        "UniformLocation",
        "UniformMetaInfo",
        "Unit",
        "Vector",
        "Vector1",
        "Vector2",
        "Vector3",
        "Vector3Facet",
        "Vector4",
        "VectorE0",
        "VectorE1",
        "VectorE2",
        "VectorE3",
        "VectorE4",
        "VectorN",
        "VersionLogger",
        "Vertex",
        "VertexArrays",
        "VertexAttribPointer",
        "VertexAttributeMap",
        "VertexBuffer",
        "View",
        "VisualOptions",
        "WebGLBlendFunc",
        "WebGLClearColor",
        "WebGLDisable",
        "WebGLEnable",
        "createView"
    ],
    "modules": [
        "EIGHT",
        "collections",
        "commands",
        "controls",
        "core",
        "facets",
        "geometries",
        "materials",
        "math",
        "primitives",
        "visual"
    ],
    "allModules": [
        {
            "displayName": "collections",
            "name": "collections",
            "description": "<p>\nCollection class for maintaining an array of types derived from Shareable.\n</p>\n<p>\nProvides a safer way to maintain reference counts than a native array.\n</p>"
        },
        {
            "displayName": "commands",
            "name": "commands",
            "description": "<p>\nInitializes <b>the</b> `type` property to 'EIGHTLogger'.\n</p>"
        },
        {
            "displayName": "controls",
            "name": "controls",
            "description": "<p>\nAllows a camera to be manipulated using mouse controls.\n</p>"
        },
        {
            "displayName": "core",
            "name": "core",
            "description": "Fundamental abstractions in the architecture."
        },
        {
            "displayName": "EIGHT",
            "name": "EIGHT"
        },
        {
            "displayName": "facets",
            "name": "facets",
            "description": "Common abstractions for computing shader uniform variables."
        },
        {
            "displayName": "geometries",
            "name": "geometries",
            "description": "<p>\nA convenience class for creating an arrow.\n</p>\n<p>\nThe initial axis unit vector defaults to <b>e<b><sub>2</sub>\n</p>\n<p>\nThe cutLine unit vector defaults to <b>e<b><sub>3</sub>\n</p>"
        },
        {
            "displayName": "materials",
            "name": "materials",
            "description": "Utilities for the construction of WebGLShader code."
        },
        {
            "displayName": "math",
            "name": "math",
            "description": "Geometric Algebra and Mathematical abstractions."
        },
        {
            "displayName": "primitives",
            "name": "primitives",
            "description": "Used for creating TRIANGLE_STRIP primitives.\nThe vertices generated have coordinates (u, v) and the traversal creates\ncounter-clockwise orientation when increasing u is the first direction and\nincreasing v the second direction."
        },
        {
            "displayName": "visual",
            "name": "visual",
            "description": "Physics modeling."
        }
    ],
    "elements": []
} };
});