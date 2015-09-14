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
    return attribsKey;
}
var Vertex = (function () {
    function Vertex() {
        this.opposing = [];
        this.attributes = {};
    }
    Vertex.prototype.toString = function () {
        return stringifyVertex(this);
    };
    return Vertex;
})();
module.exports = Vertex;