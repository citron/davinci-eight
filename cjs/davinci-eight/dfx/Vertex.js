var expectArg = require('../checks/expectArg');
function stringVectorN(name, vector) {
    if (vector) {
        return name + vector.toString();
    }
    else {
        return name;
    }
}
function stringifyVertex(vertex) {
    var attributes = vertex.attributes;
    var attribsKey = Object.keys(attributes).map(function (name) {
        var vector = attributes[name];
        return stringVectorN(name, vector);
    }).join(' ');
    return stringVectorN('P', vertex.position) + attribsKey;
}
var Vertex = (function () {
    function Vertex(position) {
        this.attributes = {};
        expectArg('position', position).toBeObject();
        this.position = position;
    }
    Vertex.prototype.toString = function () {
        return stringifyVertex(this);
    };
    return Vertex;
})();
module.exports = Vertex;
