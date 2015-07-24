/// <reference path="../vendor/davinci-blade/dist/davinci-blade.d.ts" />
import UniformMetaInfos = require('davinci-eight/core/UniformMetaInfos');
import AttributeProvider = require('davinci-eight/core/AttributeProvider');
import AttributeMetaInfos = require('davinci-eight/core/AttributeMetaInfos');
import Node3D = require('davinci-eight/core/Node3D');
import Color = require('davinci-eight/core/Color');
import View = require('davinci-eight/cameras/View');
import Frustum = require('davinci-eight/cameras/Frustum');
import LinearPerspectiveCamera = require('davinci-eight/cameras/LinearPerspectiveCamera');
import World = require('davinci-eight/worlds/World');
import UniformProvider = require('davinci-eight/core/UniformProvider');
import Face3 = require('davinci-eight/core/Face3');
import ShaderAttributeLocation = require('davinci-eight/core/ShaderAttributeLocation');
import ShaderUniformLocation = require('davinci-eight/core/ShaderUniformLocation');
import Geometry = require('davinci-eight/geometries/Geometry');
import GeometryAdapter = require('davinci-eight/geometries/GeometryAdapter');
import ArrowGeometry = require('davinci-eight/geometries/ArrowGeometry');
import BoxGeometry = require('davinci-eight/geometries/BoxGeometry');
import CylinderGeometry = require('davinci-eight/geometries/CylinderGeometry');
import DodecahedronGeometry = require('davinci-eight/geometries/DodecahedronGeometry');
import IcosahedronGeometry = require('davinci-eight/geometries/IcosahedronGeometry');
import KleinBottleGeometry = require('davinci-eight/geometries/KleinBottleGeometry');
import MobiusStripGeometry = require('davinci-eight/geometries/MobiusStripGeometry');
import OctahedronGeometry = require('davinci-eight/geometries/OctahedronGeometry');
import ParametricGeometry = require('davinci-eight/geometries/ParametricGeometry');
import PolyhedronGeometry = require('davinci-eight/geometries/PolyhedronGeometry');
import RevolutionGeometry = require('davinci-eight/geometries/RevolutionGeometry');
import SphereGeometry = require('davinci-eight/geometries/SphereGeometry');
import TetrahedronGeometry = require('davinci-eight/geometries/TetrahedronGeometry');
import TubeGeometry = require('davinci-eight/geometries/TubeGeometry');
import VortexGeometry = require('davinci-eight/geometries/VortexGeometry');
import Matrix3 = require('davinci-eight/math/Matrix3');
import Matrix4 = require('davinci-eight/math/Matrix4');
import Spinor3 = require('davinci-eight/math/Spinor3');
import Vector2 = require('davinci-eight/math/Vector2');
import Vector3 = require('davinci-eight/math/Vector3');
import DrawableModel = require('davinci-eight/objects/DrawableModel');
import Curve = require('davinci-eight/curves/Curve');
import ShaderProgram = require('davinci-eight/programs/ShaderProgram');
import Viewport = require('davinci-eight/renderers/Viewport');
import ViewportParameters = require('davinci-eight/renderers/ViewportParameters');
import AmbientLight = require('davinci-eight/uniforms/AmbientLight');
import ChainedUniformProvider = require('davinci-eight/uniforms/ChainedUniformProvider');
import DefaultUniformProvider = require('davinci-eight/uniforms/DefaultUniformProvider');
import ModelMatrixUniformProvider = require('davinci-eight/uniforms/ModelMatrixUniformProvider');
import UniformFloat = require('davinci-eight/uniforms/UniformFloat');
import UniformMat4 = require('davinci-eight/uniforms/UniformMat4');
import UniformVec2 = require('davinci-eight/uniforms/UniformVec2');
import UniformVec3 = require('davinci-eight/uniforms/UniformVec3');
import UniformVec4 = require('davinci-eight/uniforms/UniformVec4');
import RenderingContextMonitor = require('davinci-eight/utils/RenderingContextMonitor');
import WindowAnimationRunner = require('davinci-eight/utils/WindowAnimationRunner');
/**
 * @module EIGHT
 */
declare var eight: {
    'VERSION': string;
    initWebGL: (canvas: HTMLCanvasElement, attributes: any) => WebGLRenderingContext;
    view: () => View;
    frustum: (left?: number, right?: number, bottom?: number, top?: number, near?: number, far?: number) => Frustum;
    perspective: (fov?: number, aspect?: number, near?: number, far?: number) => LinearPerspectiveCamera;
    world: () => World;
    object3D: () => Node3D;
    viewport: (parameters?: ViewportParameters) => Viewport;
    contextMonitor: (canvas: HTMLCanvasElement, attributes?: any) => RenderingContextMonitor;
    workbench: (canvas: HTMLCanvasElement, renderer: any, camera: {
        aspect: number;
    }, win?: Window) => {
        setUp: () => void;
        tearDown: () => void;
    };
    animationRunner: (tick: (time: number) => void, terminate: (time: number) => void, setUp: () => void, tearDown: (ex: any) => void, $window?: Window) => WindowAnimationRunner;
    drawableModel: <MESH extends AttributeProvider, SHADERS extends ShaderProgram, MODEL extends UniformProvider>(mesh: MESH, shaders: SHADERS, model: MODEL) => DrawableModel<MESH, SHADERS, MODEL>;
    ShaderAttributeLocation: typeof ShaderAttributeLocation;
    ShaderUniformLocation: typeof ShaderUniformLocation;
    pointsProgram: () => ShaderProgram;
    shaderProgram: (vertexShader: string, fragmentShader: string) => ShaderProgram;
    smartProgram: (attributes: AttributeMetaInfos, uniformsList: UniformMetaInfos[]) => ShaderProgram;
    AmbientLight: typeof AmbientLight;
    Color: typeof Color;
    Face3: typeof Face3;
    Geometry: typeof Geometry;
    GeometryAdapter: typeof GeometryAdapter;
    ArrowGeometry: typeof ArrowGeometry;
    BoxGeometry: typeof BoxGeometry;
    CylinderGeometry: typeof CylinderGeometry;
    DodecahedronGeometry: typeof DodecahedronGeometry;
    IcosahedronGeometry: typeof IcosahedronGeometry;
    KleinBottleGeometry: typeof KleinBottleGeometry;
    MobiusStripGeometry: typeof MobiusStripGeometry;
    OctahedronGeometry: typeof OctahedronGeometry;
    ParametricGeometry: typeof ParametricGeometry;
    PolyhedronGeometry: typeof PolyhedronGeometry;
    RevolutionGeometry: typeof RevolutionGeometry;
    SphereGeometry: typeof SphereGeometry;
    TetrahedronGeometry: typeof TetrahedronGeometry;
    TubeGeometry: typeof TubeGeometry;
    VortexGeometry: typeof VortexGeometry;
    ModelMatrixUniformProvider: typeof ModelMatrixUniformProvider;
    UniformFloat: typeof UniformFloat;
    UniformMat4: typeof UniformMat4;
    UniformVec2: typeof UniformVec2;
    UniformVec3: typeof UniformVec3;
    UniformVec4: typeof UniformVec4;
    Matrix3: typeof Matrix3;
    Matrix4: typeof Matrix4;
    Spinor3: typeof Spinor3;
    Vector2: typeof Vector2;
    Vector3: typeof Vector3;
    Curve: typeof Curve;
    ChainedUniformProvider: typeof ChainedUniformProvider;
    DefaultUniformProvider: typeof DefaultUniformProvider;
    arrowMesh: (options?: {
        wireFrame?: boolean;
    }) => AttributeProvider;
    boxMesh: (options?: {
        wireFrame?: boolean;
    }) => AttributeProvider;
    box: (ambients: UniformProvider) => DrawableModel<AttributeProvider, ShaderProgram, ModelMatrixUniformProvider>;
    shaderProgramFromScripts: (vsId: string, fsId: string, $document?: Document) => ShaderProgram;
};
export = eight;