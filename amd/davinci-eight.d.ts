/// <reference path="../vendor/davinci-blade/dist/davinci-blade.d.ts" />
import Animator = require('davinci-eight/slideshow/Animator');
import Director = require('davinci-eight/slideshow/Director');
import Animation = require('davinci-eight/slideshow/animations/Animation');
import ColorTo = require('davinci-eight/slideshow/animations/ColorTo');
import MoveTo = require('davinci-eight/slideshow/animations/MoveTo');
import SpinTo = require('davinci-eight/slideshow/animations/SpinTo');
import ColorTask = require('davinci-eight/slideshow/tasks/ColorTask');
import CubeTask = require('davinci-eight/slideshow/tasks/CubeTask');
import MoveTask = require('davinci-eight/slideshow/tasks/MoveTask');
import SpinTask = require('davinci-eight/slideshow/tasks/SpinTask');
import Frustum = require('davinci-eight/cameras/Frustum');
import Perspective = require('davinci-eight/cameras/Perspective');
import View = require('davinci-eight/cameras/View');
import WebGLClear = require('davinci-eight/commands/WebGLClear');
import WebGLClearColor = require('davinci-eight/commands/WebGLClearColor');
import WebGLEnable = require('davinci-eight/commands/WebGLEnable');
import AttribLocation = require('davinci-eight/core/AttribLocation');
import AttribMetaInfo = require('davinci-eight/core/AttribMetaInfo');
import Color = require('davinci-eight/core/Color');
import DrawMode = require('davinci-eight/core/DrawMode');
import ContextKahuna = require('davinci-eight/core/ContextKahuna');
import IContextMonitor = require('davinci-eight/core/IContextMonitor');
import Symbolic = require('davinci-eight/core/Symbolic');
import UniformLocation = require('davinci-eight/core/UniformLocation');
import UniformMetaInfo = require('davinci-eight/core/UniformMetaInfo');
import Curve = require('davinci-eight/curves/Curve');
import GeometryAttribute = require('davinci-eight/geometries/GeometryAttribute');
import GeometryData = require('davinci-eight/geometries/GeometryData');
import Simplex = require('davinci-eight/geometries/Simplex');
import Vertex = require('davinci-eight/geometries/Vertex');
import GeometryMeta = require('davinci-eight/geometries/GeometryMeta');
import IDrawList = require('davinci-eight/scene/IDrawList');
import Drawable = require('davinci-eight/scene/Drawable');
import PerspectiveCamera = require('davinci-eight/scene/PerspectiveCamera');
import Scene = require('davinci-eight/scene/Scene');
import Canvas3D = require('davinci-eight/scene/Canvas3D');
import GeometryElements = require('davinci-eight/geometries/GeometryElements');
import BarnGeometry = require('davinci-eight/geometries/BarnGeometry');
import CuboidGeometry = require('davinci-eight/geometries/CuboidGeometry');
import Simplex1Geometry = require('davinci-eight/geometries/Simplex1Geometry');
import Material = require('davinci-eight/materials/Material');
import HTMLScriptsMaterial = require('davinci-eight/materials/HTMLScriptsMaterial');
import LineMaterial = require('davinci-eight/materials/LineMaterial');
import MeshMaterial = require('davinci-eight/materials/MeshMaterial');
import PointMaterial = require('davinci-eight/materials/PointMaterial');
import SmartMaterialBuilder = require('davinci-eight/materials/SmartMaterialBuilder');
import RoundUniform = require('davinci-eight/mappers/RoundUniform');
import Cartesian3 = require('davinci-eight/math/Cartesian3');
import Euclidean3 = require('davinci-eight/math/Euclidean3');
import Matrix3 = require('davinci-eight/math/Matrix3');
import Matrix4 = require('davinci-eight/math/Matrix4');
import Spinor3 = require('davinci-eight/math/Spinor3');
import Vector1 = require('davinci-eight/math/Vector1');
import Vector2 = require('davinci-eight/math/Vector2');
import Vector3 = require('davinci-eight/math/Vector3');
import Vector4 = require('davinci-eight/math/Vector4');
import VectorN = require('davinci-eight/math/VectorN');
import ArrowBuilder = require('davinci-eight/mesh/ArrowBuilder');
import CylinderArgs = require('davinci-eight/mesh/CylinderArgs');
import EulerFacet = require('davinci-eight/models/EulerFacet');
import ModelFacet = require('davinci-eight/models/ModelFacet');
import IMaterial = require('davinci-eight/core/IMaterial');
import ContextRenderer = require('davinci-eight/renderers/ContextRenderer');
import ColorFacet = require('davinci-eight/uniforms/ColorFacet');
import SineWaveUniform = require('davinci-eight/uniforms/SineWaveUniform');
import IUnknownArray = require('davinci-eight/utils/IUnknownArray');
import NumberIUnknownMap = require('davinci-eight/utils/NumberIUnknownMap');
import Shareable = require('davinci-eight/utils/Shareable');
import StringIUnknownMap = require('davinci-eight/utils/StringIUnknownMap');
import WindowAnimationRunner = require('davinci-eight/utils/WindowAnimationRunner');
/**
 * @module EIGHT
 */
declare var eight: {
    LAST_MODIFIED: string;
    strict: boolean;
    VERSION: string;
    Animator: typeof Animator;
    Director: typeof Director;
    Animation: typeof Animation;
    ColorTo: typeof ColorTo;
    MoveTo: typeof MoveTo;
    SpinTo: typeof SpinTo;
    ColorTask: typeof ColorTask;
    CubeTask: typeof CubeTask;
    MoveTask: typeof MoveTask;
    SpinTask: typeof SpinTask;
    HTMLScriptsMaterial: typeof HTMLScriptsMaterial;
    Material: typeof Material;
    LineMaterial: typeof LineMaterial;
    MeshMaterial: typeof MeshMaterial;
    PointMaterial: typeof PointMaterial;
    SmartMaterialBuilder: typeof SmartMaterialBuilder;
    WebGLClear: typeof WebGLClear;
    WebGLClearColor: typeof WebGLClearColor;
    WebGLEnable: typeof WebGLEnable;
    initWebGL: (canvas: HTMLCanvasElement, attributes?: WebGLContextAttributes) => WebGLRenderingContext;
    createFrustum: (viewMatrixName: string, projectionMatrixName: string) => Frustum;
    createPerspective: (options?: {
        fov?: number;
        aspect?: number;
        near?: number;
        far?: number;
        projectionMatrixName?: string;
        viewMatrixName?: string;
    }) => Perspective;
    createView: (options?: {
        viewMatrixName?: string;
    }) => View;
    EulerFacet: typeof EulerFacet;
    ModelFacet: typeof ModelFacet;
    Simplex: typeof Simplex;
    Vertex: typeof Vertex;
    frustumMatrix: (left: number, right: number, bottom: number, top: number, near: number, far: number, matrix?: Float32Array) => Float32Array;
    perspectiveMatrix: (fov: number, aspect: number, near: number, far: number, matrix?: Matrix4) => Matrix4;
    viewMatrix: (eye: Cartesian3, look: Cartesian3, up: Cartesian3, matrix?: Matrix4) => Matrix4;
    Scene: typeof Scene;
    Drawable: typeof Drawable;
    PerspectiveCamera: typeof PerspectiveCamera;
    Canvas3D: typeof Canvas3D;
    createDrawList: () => IDrawList;
    renderer: () => ContextRenderer;
    webgl: (attributes?: WebGLContextAttributes) => ContextKahuna;
    workbench: (canvas: HTMLCanvasElement, renderer: any, camera: {
        aspect: number;
    }, win?: Window) => {
        setUp: () => void;
        tearDown: () => void;
    };
    animation: (animate: (time: number) => void, options?: {
        setUp?: () => void;
        tearDown?: (animateException: any) => void;
        terminate?: (time: number) => boolean;
        window?: Window;
    }) => WindowAnimationRunner;
    DrawMode: typeof DrawMode;
    AttribLocation: typeof AttribLocation;
    UniformLocation: typeof UniformLocation;
    createMaterial: (monitors: IContextMonitor[], vertexShader: string, fragmentShader: string, attribs: string[]) => IMaterial;
    smartProgram: (monitors: IContextMonitor[], attributes: {
        [name: string]: AttribMetaInfo;
    }, uniformsList: {
        [name: string]: UniformMetaInfo;
    }[], bindings: string[]) => IMaterial;
    Color: typeof Color;
    CompatcGeometry: typeof GeometryElements;
    BarnGeometry: typeof BarnGeometry;
    CuboidGeometry: typeof CuboidGeometry;
    Simplex1Geometry: typeof Simplex1Geometry;
    Euclidean3: typeof Euclidean3;
    Matrix3: typeof Matrix3;
    Matrix4: typeof Matrix4;
    Spinor3: typeof Spinor3;
    Vector1: typeof Vector1;
    Vector2: typeof Vector2;
    Vector3: typeof Vector3;
    Vector4: typeof Vector4;
    VectorN: typeof VectorN;
    Curve: typeof Curve;
    RoundUniform: typeof RoundUniform;
    ArrowBuilder: typeof ArrowBuilder;
    toGeometryMeta: (geometry: Simplex[]) => GeometryMeta;
    computeFaceNormals: (simplex: Simplex, positionName?: string, normalName?: string) => void;
    cube: (size?: number) => Simplex[];
    quadrilateral: (a: VectorN<number>, b: VectorN<number>, c: VectorN<number>, d: VectorN<number>, attributes?: {
        [name: string]: VectorN<number>[];
    }, triangles?: Simplex[]) => Simplex[];
    square: (size?: number) => Simplex[];
    tetrahedron: (a: VectorN<number>, b: VectorN<number>, c: VectorN<number>, d: VectorN<number>, attributes?: {
        [name: string]: VectorN<number>[];
    }, triangles?: Simplex[]) => Simplex[];
    triangle: (a: VectorN<number>, b: VectorN<number>, c: VectorN<number>, attributes?: {
        [name: string]: VectorN<number>[];
    }, triangles?: Simplex[]) => Simplex[];
    toGeometryData: (simplices: Simplex[], geometryMeta?: GeometryMeta) => GeometryData;
    CylinderArgs: typeof CylinderArgs;
    Symbolic: typeof Symbolic;
    programFromScripts: (monitors: IContextMonitor[], vsId: string, fsId: string, $document: Document, attribs?: string[]) => IMaterial;
    GeometryAttribute: typeof GeometryAttribute;
    GeometryElements: typeof GeometryElements;
    ColorFacet: typeof ColorFacet;
    SineWaveUniform: typeof SineWaveUniform;
    IUnknownArray: typeof IUnknownArray;
    NumberIUnknownMap: typeof NumberIUnknownMap;
    refChange: (uuid: string, name?: string, change?: number) => number;
    Shareable: typeof Shareable;
    StringIUnknownMap: typeof StringIUnknownMap;
};
export = eight;
