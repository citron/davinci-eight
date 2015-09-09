var isDefined = require('../checks/isDefined');
var expectArg = require('../checks/expectArg');
var Elements = require('../dfx/Elements');
var VectorN = require('../math/VectorN');
var stringFaceVertex = require('../dfx/stringFaceVertex');
var VERTICES_PER_FACE = 3;
var COORDS_PER_POSITION = 3;
var COORDS_PER_NORMAL = 3;
var COORDS_PER_TEXTURE = 2;
// This function has the important side-effect of setting the index property.
// TODO: It would be better to copy the Face structure?
function computeUniques(faces) {
    var map = {};
    var uniques = [];
    function munge(fv) {
        var key = stringFaceVertex(fv);
        if (map[key]) {
            var existing = map[key];
            fv.index = existing.index;
        }
        else {
            fv.index = uniques.length;
            uniques.push(fv);
            map[key] = fv;
        }
    }
    faces.forEach(function (face) {
        munge(face.a);
        munge(face.b);
        munge(face.c);
    });
    return uniques;
}
function numberList(size, value) {
    var data = [];
    for (var i = 0; i < size; i++) {
        data.push(value);
    }
    return data;
}
function triangleElementsFromFaces(faces) {
    expectArg('faces', faces).toBeObject();
    var uniques = computeUniques(faces);
    var elements = {};
    // Although it is possible to use a VectorN here, working with number[] will
    // be faster and will later allow us to fix the length of the VectorN.
    var indices = [];
    var positions = numberList(uniques.length * COORDS_PER_POSITION, void 0);
    var normals = numberList(uniques.length * COORDS_PER_NORMAL, void 0);
    var coords = numberList(uniques.length * COORDS_PER_TEXTURE, void 0);
    faces.forEach(function (face, faceIndex) {
        var a = face.a;
        var b = face.b;
        var c = face.c;
        var offset = faceIndex * 3;
        indices.push(a.index);
        indices.push(b.index);
        indices.push(c.index);
    });
    uniques.forEach(function (unique) {
        var position = unique.position;
        var normal = unique.normal;
        var uvs = unique.coords;
        var index = unique.index;
        var offset2x = index * COORDS_PER_TEXTURE;
        var offset2y = offset2x + 1;
        var offset3x = index * COORDS_PER_POSITION;
        var offset3y = offset3x + 1;
        var offset3z = offset3y + 1;
        positions[offset3x] = position.x;
        positions[offset3y] = position.y;
        positions[offset3z] = position.z;
        normals[offset3x] = normal.x;
        normals[offset3y] = normal.y;
        normals[offset3z] = normal.z;
        if (isDefined(uvs)) {
            coords[offset2x] = uvs.x;
            coords[offset2y] = uvs.y;
        }
        else {
            coords[offset2x] = 0;
            coords[offset2y] = 0;
        }
    });
    var attributes = {};
    // Specifying the size fixes the length of the VectorN, disabling push and pop, etc.
    attributes['positions'] = new VectorN(positions, false, positions.length);
    attributes['normals'] = new VectorN(normals, false, normals.length);
    attributes['coords'] = new VectorN(coords, false, coords.length);
    return new Elements(new VectorN(indices, false, indices.length), attributes);
}
module.exports = triangleElementsFromFaces;
