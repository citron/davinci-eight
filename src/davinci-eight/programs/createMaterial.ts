import AttribLocation = require('../core/AttribLocation')
import VectorE1 = require('../math/VectorE1')
import VectorE2 = require('../math/VectorE2')
import VectorE3 = require('../math/VectorE3')
import VectorE4 = require('../math/VectorE4')
import IContextProvider = require('../core/IContextProvider')
import IContextMonitor = require('../core/IContextMonitor')
import core = require('../core')
import IMaterial = require('../core/IMaterial')
import MutableNumber = require('../math/MutableNumber')
import Matrix2 = require('../math/Matrix2')
import Matrix3 = require('../math/Matrix3')
import Matrix4 = require('../math/Matrix4')
import MonitorList = require('../scene/MonitorList')
import NumberIUnknownMap = require('../collections/NumberIUnknownMap')
import expectArg = require('../checks/expectArg')
import isDefined = require('../checks/isDefined')
import mustBeDefined = require('../checks/mustBeDefined')
import mustBeInteger = require('../checks/mustBeInteger')
import mustBeString = require('../checks/mustBeString')
import uuid4 = require('../utils/uuid4')
import UniformLocation = require('../core/UniformLocation')
import UniformMetaInfo = require('../core/UniformMetaInfo')
import MutableVectorE2 = require('../math/MutableVectorE2')
import MutableVectorE3 = require('../math/MutableVectorE3')
import MutableVectorE4 = require('../math/MutableVectorE4')
import refChange = require('../utils/refChange')
import Shareable = require('../utils/Shareable')
import SimpleWebGLProgram = require('../programs/SimpleWebGLProgram')

/**
 * Name used for reference count monitoring and logging.
 */
let LOGGING_NAME_IMATERIAL = 'IMaterial'

/**
 * Creates a WebGLProgram with compiled and linked shaders.
 */

// FIXME: Handle list of shaders? Else createSimpleProgram

let createMaterial = function(monitors: IContextMonitor[], vertexShader: string, fragmentShader: string, attribs: string[]): IMaterial {
  MonitorList.verify('monitors', monitors, () => { return "createMaterial"})
  // FIXME multi-context
  if (typeof vertexShader !== 'string') {
    throw new Error("vertexShader argument must be a string.")
  }

  if (typeof fragmentShader !== 'string') {
    throw new Error("fragmentShader argument must be a string.")
  }

  var refCount: number = 1
  /**
   * Because we are multi-canvas aware, programs are tracked by the canvas id.
   */
  var programsByCanvasId = new NumberIUnknownMap<SimpleWebGLProgram>()

  let uuid: string = uuid4().generate()

  var self: IMaterial = {
    get vertexShader() {
      return vertexShader
    },
    get fragmentShader() {
      return fragmentShader
    },
    attributes(canvasId: number): { [name: string]: AttribLocation } {
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        return program.attributes;
      }
    },
    uniforms(canvasId: number): { [name: string]: UniformLocation } {
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        return program.uniforms;
      }
    },
    addRef(): number {
      refChange(uuid, LOGGING_NAME_IMATERIAL, +1)
      refCount++
      return refCount
    },
    release(): number {
      refChange(uuid, LOGGING_NAME_IMATERIAL, -1)
      refCount--
      if (refCount === 0) {
        MonitorList.removeContextListener(self, monitors)
        programsByCanvasId.release()
      }
      return refCount
    },
    contextFree(canvasId: number) {
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        program.contextFree(canvasId)
        programsByCanvasId.remove(canvasId)
      }
    },
    contextGain(manager: IContextProvider): void {
      var canvasId: number
      var sprog: SimpleWebGLProgram
      canvasId = manager.canvasId
      if (!programsByCanvasId.exists(canvasId)) {
        sprog = new SimpleWebGLProgram(manager, vertexShader, fragmentShader, attribs)
        programsByCanvasId.putWeakRef(canvasId, sprog)
      }
      else {
        sprog = programsByCanvasId.getWeakRef(canvasId)
      }
      sprog.contextGain(manager)
    },
    contextLost(canvasId: number) {
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        program.contextLost(canvasId)
        programsByCanvasId.remove(canvasId)
      }
    },
    get programId() {
      return uuid
    },
    use(canvasId: number): void {
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        program.use()
      }
      else {
        console.warn(LOGGING_NAME_IMATERIAL + " use(canvasId: number) missing WebGLRenderingContext")
      }
    },
    enableAttrib(name: string, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let attribLoc = program.attributes[name]
        if (attribLoc) {
          attribLoc.enable()
        }
        else {
        }
      }
      else {
      }
    },
    disableAttrib(name: string, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let attribLoc = program.attributes[name]
        if (attribLoc) {
          attribLoc.enable()
        }
        else {
        }
      }
      else {
      }
    },
    uniform1f(name: string, x: number, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.uniform1f(x)
        }
        else {
          // warning
        }
      }
      else {
        // warning
      }
    },
    uniform2f(name: string, x: number, y: number, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.uniform2f(x, y)
        }
      }
    },
    uniform3f(name: string, x: number, y: number, z: number, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.uniform3f(x, y, z)
        }
      }
    },
    uniform4f(name: string, x: number, y: number, z: number, w: number, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.uniform4f(x, y, z, w)
        }
      }
    },
    uniformMatrix2(name: string, transpose: boolean, matrix: Matrix2, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.matrix2(transpose, matrix)
        }
      }
    },
    uniformMatrix3(name: string, transpose: boolean, matrix: Matrix3, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.matrix3(transpose, matrix)
        }
      }
    },
    uniformMatrix4(name: string, transpose: boolean, matrix: Matrix4, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.matrix4(transpose, matrix)
        }
      }
      else {
        if (core.verbose) {
          console.warn("Ignoring uniformMatrix4 for " + name + " because `typeof canvasId` is " + typeof canvasId)
        }
      }
    },
    uniformVectorE2(name: string, vector: VectorE2, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.cartesian2(vector)
        }
      }
    },
    uniformVectorE3(name: string, vector: VectorE3, canvasId: number) {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.cartesian3(vector)
        }
      }
    },
    uniformVectorE4(name: string, vector: VectorE4, canvasId: number): void {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.cartesian4(vector)
        }
      }
    },
    vector2(name: string, data: number[], canvasId: number): void {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.vector2(data)
        }
      }
    },
    vector3(name: string, data: number[], canvasId: number): void {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.vector3(data)
        }
      }
    },
    vector4(name: string, data: number[], canvasId: number): void {
      mustBeString('name', name)
      mustBeInteger('canvasId', canvasId)
      let program = programsByCanvasId.getWeakRef(canvasId)
      if (program) {
        let uniformLoc = program.uniforms[name]
        if (uniformLoc) {
          uniformLoc.vector4(data)
        }
      }
    }
  }
  MonitorList.addContextListener(self, monitors)
  MonitorList.synchronize(self, monitors)
  refChange(uuid, LOGGING_NAME_IMATERIAL, +1)
  return self
}

export = createMaterial