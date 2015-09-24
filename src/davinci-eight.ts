/// <reference path="../vendor/davinci-blade/dist/davinci-blade.d.ts" />

// cameras
import createFrustum           = require('davinci-eight/cameras/createFrustum')
import createPerspective       = require('davinci-eight/cameras/createPerspective')
import createView              = require('davinci-eight/cameras/createView')
import Frustum                 = require('davinci-eight/cameras/Frustum')
import Perspective             = require('davinci-eight/cameras/Perspective')
import View                    = require('davinci-eight/cameras/View')
import frustumMatrix           = require('davinci-eight/cameras/frustumMatrix')
import perspectiveMatrix       = require('davinci-eight/cameras/perspectiveMatrix')
import viewMatrix              = require('davinci-eight/cameras/viewMatrix')
// commands
import WebGLClear              = require('davinci-eight/commands/WebGLClear')
import WebGLClearColor         = require('davinci-eight/commands/WebGLClearColor')
import WebGLEnable             = require('davinci-eight/commands/WebGLEnable')
// core
import AttribLocation          = require('davinci-eight/core/AttribLocation')
import AttribMetaInfo          = require('davinci-eight/core/AttribMetaInfo')
import Color                   = require('davinci-eight/core/Color')
import core                    = require('davinci-eight/core')
import DrawMode                = require('davinci-eight/core/DrawMode')
import Face3                   = require('davinci-eight/core/Face3')
import ContextController       = require('davinci-eight/core/ContextController')
import ContextKahuna           = require('davinci-eight/core/ContextKahuna')
import ContextManager          = require('davinci-eight/core/ContextManager')
import ContextMonitor          = require('davinci-eight/core/ContextMonitor')
import Symbolic                = require('davinci-eight/core/Symbolic')
import UniformData             = require('davinci-eight/core/UniformData')
import UniformDataVisitor      = require('davinci-eight/core/UniformDataVisitor')
import UniformLocation         = require('davinci-eight/core/UniformLocation')
import UniformMetaInfo         = require('davinci-eight/core/UniformMetaInfo')
// curves
import Curve = require('davinci-eight/curves/Curve')
// dfx
import DrawAttribute = require('davinci-eight/dfx/DrawAttribute')
import GeometryData = require('davinci-eight/dfx/GeometryData')
import Simplex = require('davinci-eight/dfx/Simplex')
import Vertex = require('davinci-eight/dfx/Vertex')
import toGeometryMeta = require('davinci-eight/dfx/toGeometryMeta')
import GeometryMeta = require('davinci-eight/dfx/GeometryMeta')
import computeFaceNormals = require('davinci-eight/dfx/computeFaceNormals')
import cube = require('davinci-eight/dfx/cube')
import quadrilateral = require('davinci-eight/dfx/quadrilateral')
import square = require('davinci-eight/dfx/square')
import tetrahedron = require('davinci-eight/dfx/tetrahedron')
import toGeometryData = require('davinci-eight/dfx/toGeometryData')
import triangle = require('davinci-eight/dfx/triangle')

// scene
import createDrawList     = require('davinci-eight/scene/createDrawList')
import ICamera            = require('davinci-eight/scene/ICamera')
import IDrawList          = require('davinci-eight/scene/IDrawList')
import Mesh               = require('davinci-eight/scene/Mesh')
import PerspectiveCamera = require('davinci-eight/scene/PerspectiveCamera')
import Scene = require('davinci-eight/scene/Scene')
import Canvas3D = require('davinci-eight/scene/Canvas3D')
// geometries
import Geometry = require('davinci-eight/geometries/Geometry')
//import ArrowGeometry = require('davinci-eight/geometries/ArrowGeometry')
//import BarnGeometry = require('davinci-eight/geometries/BarnGeometry')
import CuboidComplex  = require('davinci-eight/geometries/CuboidComplex')
import CuboidGeometry = require('davinci-eight/geometries/CuboidGeometry')
//import CylinderGeometry = require('davinci-eight/geometries/CylinderGeometry')
//import DodecahedronGeometry = require('davinci-eight/geometries/DodecahedronGeometry')
//import EllipticalCylinderGeometry = require('davinci-eight/geometries/EllipticalCylinderGeometry')
//import IcosahedronGeometry = require('davinci-eight/geometries/IcosahedronGeometry')
//import KleinBottleGeometry = require('davinci-eight/geometries/KleinBottleGeometry')
//import MobiusStripGeometry = require('davinci-eight/geometries/MobiusStripGeometry')
//import OctahedronGeometry = require('davinci-eight/geometries/OctahedronGeometry')
//import SurfaceGeometry = require('davinci-eight/geometries/SurfaceGeometry')
//import PolyhedronGeometry = require('davinci-eight/geometries/PolyhedronGeometry')
//import RevolutionGeometry = require('davinci-eight/geometries/RevolutionGeometry')
//import SphereGeometry = require('davinci-eight/geometries/SphereGeometry')
//import TetrahedronGeometry = require('davinci-eight/geometries/TetrahedronGeometry')
//import TubeGeometry = require('davinci-eight/geometries/TubeGeometry')
//import VortexGeometry = require('davinci-eight/geometries/VortexGeometry')
// programs
import createMaterial = require('davinci-eight/programs/createMaterial')
import smartProgram = require('davinci-eight/programs/smartProgram')
import programFromScripts = require('davinci-eight/programs/programFromScripts')

// materials
import Material             = require('davinci-eight/materials/Material')
import HTMLScriptsMaterial  = require('davinci-eight/materials/HTMLScriptsMaterial')
import MeshNormalMaterial   = require('davinci-eight/materials/MeshNormalMaterial')
import SmartMaterialBuilder = require('davinci-eight/materials/SmartMaterialBuilder')
// mappers
import RoundUniform = require('davinci-eight/mappers/RoundUniform')
// math
import AbstractMatrix = require('davinci-eight/math/AbstractMatrix')
import Cartesian1 = require('davinci-eight/math/Cartesian1')
import Cartesian2 = require('davinci-eight/math/Cartesian2')
import Cartesian3 = require('davinci-eight/math/Cartesian3')
import Cartesian4 = require('davinci-eight/math/Cartesian4')
//import Color = require('davinci-eight/math/Color') - conflict with core
import Complex = require('davinci-eight/math/Complex')
import ComplexError = require('davinci-eight/math/ComplexError')
import DimensionError = require('davinci-eight/math/DimensionError')
import Dimensions = require('davinci-eight/math/Dimensions')
import Euclidean1 = require('davinci-eight/math/Euclidean1')
import Euclidean1Coords = require('davinci-eight/math/Euclidean1Coords')
import Euclidean1Error = require('davinci-eight/math/Euclidean1Error')
import Euclidean2 = require('davinci-eight/math/Euclidean2')
import Euclidean2Error = require('davinci-eight/math/Euclidean2Error')
import Euclidean3 = require('davinci-eight/math/Euclidean3')
import Euclidean3Error = require('davinci-eight/math/Euclidean3Error')
import Euler = require('davinci-eight/math/Euler')
import GeometricElement = require('davinci-eight/math/GeometricElement')
import LinearElement = require('davinci-eight/math/LinearElement')
import mathcore = require('davinci-eight/math/mathcore')
import Matrix1 = require('davinci-eight/math/Matrix1')
import Matrix2 = require('davinci-eight/math/Matrix2')
import Matrix3 = require('davinci-eight/math/Matrix3')
import Matrix4 = require('davinci-eight/math/Matrix4')
import Measure = require('davinci-eight/math/Measure')
import Mutable = require('davinci-eight/math/Mutable')
import Quaternion = require('davinci-eight/math/Quaternion')
import Rational = require('davinci-eight/math/Rational')
import RationalError = require('davinci-eight/math/RationalError')
import Rotor3 = require('davinci-eight/math/Rotor3')
import rotor3 = require('davinci-eight/math/rotor3')
import Spinor1 = require('davinci-eight/math/Spinor1')
import Spinor1Coords = require('davinci-eight/math/Spinor1Coords')
import Spinor2 = require('davinci-eight/math/Spinor2')
import Spinor2Coords = require('davinci-eight/math/Spinor2Coords')
import Spinor3 = require('davinci-eight/math/Spinor3')
import Spinor3Coords = require('davinci-eight/math/Spinor3Coords')
import Unit = require('davinci-eight/math/Unit')
import UnitError = require('davinci-eight/math/UnitError')
import Vector1 = require('davinci-eight/math/Vector1')
import Vector2 = require('davinci-eight/math/Vector2')
import Vector3 = require('davinci-eight/math/Vector3')
import Vector4 = require('davinci-eight/math/Vector4')
import VectorN = require('davinci-eight/math/VectorN')
// mesh
import ArrowBuilder = require('davinci-eight/mesh/ArrowBuilder')
import ArrowOptions = require('davinci-eight/mesh/ArrowOptions')
import BoxOptions = require('davinci-eight/mesh/BoxOptions')
import CylinderArgs = require('davinci-eight/mesh/CylinderArgs')
import CylinderOptions = require('davinci-eight/mesh/CylinderOptions')
import SphereOptions = require('davinci-eight/mesh/SphereOptions')

// models
import EulerModel = require('davinci-eight/models/EulerModel')
import Model      = require('davinci-eight/models/Model')
import RigidBody3 = require('davinci-eight/models/RigidBody3')

// programs
import IMaterial = require('davinci-eight/core/IMaterial')
// renderers
import ContextRenderer = require('davinci-eight/renderers/ContextRenderer')
import initWebGL = require('davinci-eight/renderers/initWebGL')
import renderer = require('davinci-eight/renderers/renderer')
// uniforms
import SineWaveUniform            = require('davinci-eight/uniforms/SineWaveUniform')
import StockTicker                = require('davinci-eight/uniforms/StockTicker')

// utils
import contextProxy               = require('davinci-eight/utils/contextProxy')
import Framerate                  = require('davinci-eight/utils/Framerate')
import loadImageTexture           = require('davinci-eight/utils/loadImageTexture')
import makeBox                    = require('davinci-eight/utils/makeBox')
import makeSphere                 = require('davinci-eight/utils/makeSphere')
import refChange                  = require('davinci-eight/utils/refChange')
import Shareable                  = require('davinci-eight/utils/Shareable')
import workbench3D                = require('davinci-eight/utils/workbench3D')
import WindowAnimationRunner      = require('davinci-eight/utils/WindowAnimationRunner')
import windowAnimationRunner      = require('davinci-eight/utils/windowAnimationRunner')

/**
 * @module EIGHT
 */
var eight = {
  /**
   * The publish date of the latest version of the library.
   * @property LAST_MODIFIED
   * @type string
   * @readOnly
   */
  get LAST_MODIFIED() { return core.LAST_MODIFIED },

  get strict(): boolean {
    return core.strict
  },
  set strict(value: boolean) {
    core.strict = value
  },
  /**
   * The semantic version of the library.
   * @property VERSION
   * @type string
   * @readOnly
   */
  get VERSION() { return core.VERSION },
  // TODO: Arrange in alphabetical order in order to assess width of API.
  // materials
  get HTMLScriptsMaterial() { return HTMLScriptsMaterial },
  get Material() { return Material },
  get MeshNormalMaterial() { return MeshNormalMaterial },
  get SmartMaterialBuilder() { return SmartMaterialBuilder },
  //commands
  get WebGLClear() { return WebGLClear },
  get WebGLClearColor() { return WebGLClearColor },
  get WebGLEnable() { return WebGLEnable },

  get initWebGL() { return initWebGL },
  get createFrustum() { return createFrustum },
  get createPerspective() { return createPerspective },
  get createView() { return createView },

  get EulerModel() { return EulerModel },
  get Model() { return Model },
  get RigidBody3() { return RigidBody3 },

  get Simplex() { return Simplex },
  get Vertex() { return Vertex },
  get frustumMatrix() { return frustumMatrix },
  get perspectiveMatrix() { return perspectiveMatrix },
  get viewMatrix() { return viewMatrix },
  get Scene() { return Scene },
  get Mesh() { return Mesh },
  get PerspectiveCamera() { return PerspectiveCamera },
  get Canvas3D() { return Canvas3D },
  get createDrawList() { return createDrawList },
  get renderer() { return renderer },
  get webgl() {return contextProxy},
  workbench: workbench3D,
  animation: windowAnimationRunner,
  get DrawMode() { return DrawMode },
  get AttribLocation() { return AttribLocation },
  get UniformLocation() { return UniformLocation },
  get createMaterial() {
    return createMaterial
  },
  get smartProgram() {
    return smartProgram
  },
  get Color() { return Color },
  get Face3() { return Face3 },
  get Geometry() { return Geometry },
//  get ArrowGeometry() { return ArrowGeometry },
//  get BarnGeometry() { return BarnGeometry },
  get CuboidComplex() { return CuboidComplex },
  get CuboidGeometry() { return CuboidGeometry },
//  get CylinderGeometry() { return CylinderGeometry },
//  get DodecahedronGeometry() { return DodecahedronGeometry },
//  get EllipticalCylinderGeometry() { return EllipticalCylinderGeometry },
//  get IcosahedronGeometry() { return IcosahedronGeometry },
//  get KleinBottleGeometry() { return KleinBottleGeometry },
//  get MobiusStripGeometry() { return MobiusStripGeometry },
//  get OctahedronGeometry() { return OctahedronGeometry },
//  get SurfaceGeometry() { return SurfaceGeometry },
//  get PolyhedronGeometry() { return PolyhedronGeometry },
//  get RevolutionGeometry() { return RevolutionGeometry },
//  get SphereGeometry() { return SphereGeometry },
//  get TetrahedronGeometry() { return TetrahedronGeometry },
//  get TubeGeometry() { return TubeGeometry },
//  get VortexGeometry() { return VortexGeometry },
  get Matrix3() { return Matrix3 },
  get Matrix4() { return Matrix4 },
  get rotor3() { return rotor3 },
  get Spinor3() { return Spinor3 },
  get Quaternion() { return Quaternion },
  get Vector1() { return Vector1 },
  get Vector2() { return Vector2 },
  get Vector3() { return Vector3 },
  get Vector4() { return Vector4 },
  get VectorN() { return VectorN },
  get Curve() { return Curve },
  // mappers
  get RoundUniform() { return RoundUniform },
  // mesh
  get ArrowBuilder() { return ArrowBuilder },
  
  get toGeometryMeta() { return toGeometryMeta },
  get computeFaceNormals() { return computeFaceNormals },
  get cube() { return cube },
  get quadrilateral() { return quadrilateral },
  get square() { return square },
  get tetrahedron() { return tetrahedron },
  get triangle() { return triangle },
  get toGeometryData() { return toGeometryData },
  get CylinderArgs() { return CylinderArgs },

  get Symbolic() { return Symbolic },
  // programs
  get programFromScripts() { return programFromScripts },
  get DrawAttribute() { return DrawAttribute },
  get GeometryData() { return GeometryData },
  // uniforms
  get SineWaveUniform() { return SineWaveUniform },
  // utils
  get refChange() { return refChange },
  get Shareable() { return Shareable }
}
export = eight
