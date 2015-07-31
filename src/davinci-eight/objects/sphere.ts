import AttributeProvider = require('../core/AttributeProvider');
import ShaderProgram = require('../programs/ShaderProgram');
import LocalModel = require('../uniforms/LocalModel');
import DrawableModel = require('../objects/DrawableModel');
import drawableModel = require('../objects/drawableModel');
import sphereMesh = require('../mesh/sphereMesh');
import smartProgram = require('../programs/smartProgram');
import UniformProvider = require('../core/UniformProvider');
import SphereOptions = require('../mesh/SphereOptions');

function sphere(ambients: UniformProvider, options?: SphereOptions): DrawableModel<AttributeProvider, ShaderProgram, LocalModel> {
  let mesh = sphereMesh(options);
  let model = new LocalModel();
  let shaders = smartProgram(mesh.getAttributeMetaInfos(), [model.getUniformMetaInfos(), ambients.getUniformMetaInfos()]);
  return drawableModel(mesh, shaders, model);
}

export = sphere;
