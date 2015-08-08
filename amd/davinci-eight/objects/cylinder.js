define(["require", "exports", '../uniforms/Node', '../objects/primitive', '../mesh/cylinderMesh', '../programs/smartProgram'], function (require, exports, Node, primitive, cylinderMesh, smartProgram) {
    function cylinder(ambients, options) {
        var mesh = cylinderMesh(options);
        var model = new Node();
        var shaders = smartProgram(mesh.getAttribMeta(), [model.getUniformMeta(), ambients.getUniformMeta()]);
        return primitive(mesh, shaders, model);
    }
    return cylinder;
});
