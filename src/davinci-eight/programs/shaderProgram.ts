import ShaderProgram = require('../programs/ShaderProgram');
import AttributeProvider = require('../core/AttributeProvider');
import parse = require('../glsl/parse');
import NodeWalker = require('../glsl/NodeWalker');
import ProgramArgs = require('../glsl/ProgramArgs');
import Declaration = require('../glsl/Declaration');
import DebugNodeEventHandler = require('../glsl/DebugNodeEventHandler');
import DefaultNodeEventHandler = require('../glsl/DefaultNodeEventHandler');
import uuid4 = require('../utils/uuid4');
import ShaderAttributeLocation = require('../core/ShaderAttributeLocation');
import ShaderUniformLocation = require('../core/ShaderUniformLocation');
import ShaderVariableDecl = require('../core/ShaderVariableDecl');

var shaderProgram = function(vertexShader: string, fragmentShader: string): ShaderProgram {

  if (typeof vertexShader !== 'string') {
    throw new Error("vertexShader argument must be a string.");
  }
  if (typeof fragmentShader !== 'string') {
    throw new Error("fragmentShader argument must be a string.");
  }
  function analyze() {
    // TODO: uniform with same name in both files.
    // TODO: varying correlation.
    function shaderVariable(d: Declaration): ShaderVariableDecl {
      return { modifiers: d.modifiers, type: d.type, name: d.name };
    }
    function analyzeVertexShader() {
      try {
        let vsTree = parse(vertexShader);
        let walker = new NodeWalker();
        let args = new ProgramArgs();
        walker.walk(vsTree, args);
        // attributes
        args.attributes.forEach(function(a: Declaration) {
          let attributeDecl = shaderVariable(a);
          attributeDecls.push(attributeDecl);
          attributeLocations[attributeDecl.name] = new ShaderAttributeLocation(attributeDecl.name, attributeDecl.type);
        });
        // uniforms
        args.uniforms.forEach(function(u: Declaration) {
          let uniformDecl = shaderVariable(u);
          uniformDecls.push(uniformDecl);
          uniformLocations[uniformDecl.name] = new ShaderUniformLocation(uniformDecl.name, uniformDecl.type);
        });
        // varyings
        args.varyings.forEach(function(v: Declaration) {
          let varyingDecl = shaderVariable(v);
          varyingDecls.push(varyingDecl);
        });
      }
      catch(e) {
        console.log(e);
      }
    }
    function analyzeFragmentShader() {
      try {
        let fsTree = parse(fragmentShader);
        let walker = new NodeWalker();
        let args = new ProgramArgs();
        walker.walk(fsTree, args);
        // attributes
        // uniforms
        args.uniforms.forEach(function(u: Declaration) {
          let uniformDecl = shaderVariable(u);
          uniformDecls.push(uniformDecl);
          uniformLocations[uniformDecl.name] = new ShaderUniformLocation(uniformDecl.name, uniformDecl.type);
        });
        // varyings
      }
      catch(e) {
        console.log(e);
      }
    }

    analyzeVertexShader();
    analyzeFragmentShader();
  }

  var program: WebGLProgram;
  var programId: string;
  var context: WebGLRenderingContext;
  var contextGainId: string;

  var attributeDecls: ShaderVariableDecl[] = [];
  var uniformDecls:   ShaderVariableDecl[] = [];
  var varyingDecls:   ShaderVariableDecl[] = [];

  var attributeLocations: { [name: string]: ShaderAttributeLocation } = {};
  var uniformLocations: { [name: string]: ShaderUniformLocation } = {};

  var publicAPI: ShaderProgram = {
    get vertexShader() {
      return vertexShader;
    },
    get fragmentShader() {
      return fragmentShader;
    },
    get attributes() {
      return attributeDecls;
    },
    get uniforms() {
      return uniformDecls;
    },
    get varyings() {
      return varyingDecls;
    },
    contextFree: function(): void {
      if (program) {
        context.deleteProgram(program);
        program = void 0;
        programId = void 0;
        context = void 0;
        contextGainId = void 0;
        attributeDecls.forEach(function(attributeDecl) {
          attributeLocations[attributeDecl.name].contextFree();
        });
        uniformDecls.forEach(function(uniformDecl) {
          uniformLocations[uniformDecl.name].contextFree();
        });
      }
    },
    contextGain: function(contextArg: WebGLRenderingContext, contextId: string): void {
      context = contextArg;
      if (contextGainId !== contextId) {
        program = makeWebGLProgram(context, vertexShader, fragmentShader);
        programId = uuid4().generate();
        contextGainId = contextId;
        attributeDecls.forEach(function(attributeDecl) {
          attributeLocations[attributeDecl.name].contextGain(contextArg, program);
        });
        uniformDecls.forEach(function(uniformDecl) {
          uniformLocations[uniformDecl.name].contextGain(contextArg, program);
        });
      }
    },
    contextLoss() {
      program = void 0;
      programId = void 0;
      context = void 0;
      contextGainId = void 0;
      attributeDecls.forEach(function(attributeDecl) {
        attributeLocations[attributeDecl.name].contextLoss();
      });
      uniformDecls.forEach(function(uniformDecl) {
        uniformLocations[uniformDecl.name].contextLoss();
      });
    },
    hasContext: function(): boolean {
      return !!program;
    },
    get program() { return program; },
    get programId() {return programId;},
    use() {
      if (context) {
        return context.useProgram(program);
      }
    },
    attributeVariable(name: string) {
      if (attributeLocations[name]) {
        return attributeLocations[name];
      }
      else {
        throw new Error(name + " is not an attribute variable in the shader program.");
      }
    },
    uniformVariable(name: string) {
      if (uniformLocations[name]) {
        return uniformLocations[name];
      }
      else {
        throw new Error(name + " is not a uniform variable in the shader program.");
      }
    }
  };

  analyze();

  return publicAPI;
};

/**
 * Creates a WebGLProgram with compiled and linked shaders.
 */
function makeWebGLProgram(gl: WebGLRenderingContext, vertexShader: string, fragmentShader: string): WebGLProgram {
  // TODO: Proper cleanup if we throw an error at any point.
  var vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vertexShader);
  gl.compileShader(vs);
  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(vs));
  }
  var fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fragmentShader);
  gl.compileShader(fs);
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(fs));
  }
  var program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  return program;
}

export = shaderProgram;