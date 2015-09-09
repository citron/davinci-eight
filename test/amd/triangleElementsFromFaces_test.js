define(
[
  'davinci-eight/dfx/Face',
  'davinci-eight/dfx/FaceVertex',
  'davinci-eight/math/Vector3',
  'davinci-eight/dfx/triangleElementsFromFaces',
  'davinci-eight/dfx/Elements'
],
function(Face, FaceVertex, Vector3, triangleElementsFromFaces, Elements)
{
  var VERTICES_PER_FACE = 3;
  var COORDS_PER_POSITION = 3;
  var COORDS_PER_NORMAL = 3;
  var COORDS_PER_TEXTURE = 2;

  describe("triangleElementsFromFaces", function() {
    describe("zero triangles", function() {
      it("should create empty arrays", function() {
        var faces = [];
        var elements = triangleElementsFromFaces(faces);
        var indices = elements.indices;
        expect(indices.length).toBe(faces.length * 3);
      });
    });
    describe("one triangle", function() {
      var A = new Vector3([0.0, 0.0, 0.0]);
      var B = new Vector3([0.1, 0.0, 0.0]);
      var C = new Vector3([0.0, 0.1, 0.0]);
      var f = new Face(A, B, C);
      var a = f.a;
      var b = f.b;
      var c = f.c;
      var faces = [];
      faces.push(f);
      var elements = triangleElementsFromFaces(faces);
      var indices = elements.indices;
      var positions = elements.attributes['positions'];
      it("indices.length", function() {
        expect(indices.length).toBe(faces.length * 3);
      });
      it("indices[0]", function() {
        expect(indices[0]).toBe(0);
      });
      it("indices[1]", function() {
        expect(indices[1]).toBe(1);
      });
      it("indices[2]", function() {
        expect(indices[2]).toBe(2);
      });
      it("should create 9 positions", function() {
        expect(positions.length).toBe(9);
      });
      it("position[0]", function() {
        expect(positions[0]).toBe(a.position.x);
      });
      it("position[1]", function() {
        expect(positions[1]).toBe(a.position.y);
      });
      it("position[2]", function() {
        expect(positions[2]).toBe(a.position.z);
      });
      it("position[3]", function() {
        expect(positions[3]).toBe(b.position.x);
      });
      it("position[4]", function() {
        expect(positions[4]).toBe(b.position.y);
      });
      it("position[5]", function() {
        expect(positions[5]).toBe(b.position.z);
      });
      it("position[6]", function() {
        expect(positions[6]).toBe(c.position.x);
      });
      it("position[7]", function() {
        expect(positions[7]).toBe(c.position.y);
      });
      it("position[8]", function() {
        expect(positions[8]).toBe(c.position.z);
      });
    });
    describe("two triangles with one common edge", function() {
      var vec0 = new Vector3([0.2, 0.0, 0.0]);
      var vec1 = new Vector3([0.0, 0.0, 0.0]);
      var vec2 = new Vector3([0.0, 0.2, 0.0]);
      var vec3 = new Vector3([0.2, 0.2, 0.0]);
      var f012 = new Face(vec0, vec1, vec2);
      var f023 = new Face(vec0, vec2, vec3);
      var faces = [];
      faces.push(f012);
      faces.push(f023);
      var elements = triangleElementsFromFaces(faces);
      var indices = elements.indices;
      var positions = elements.attributes['positions'];
      it("indices.length", function() {
        expect(indices.length).toBe(faces.length * 3);
      });
      it("indices[0]", function() {
        expect(indices[0]).toBe(0);
      });
      it("indices[1]", function() {
        expect(indices[1]).toBe(1);
      });
      it("indices[2]", function() {
        expect(indices[2]).toBe(2);
      });
      it("indices[3]", function() {
        expect(indices[3]).toBe(0);
      });
      it("indices[4]", function() {
        expect(indices[4]).toBe(2);
      });
      it("indices[5]", function() {
        expect(indices[5]).toBe(3);
      });
      it("should create 12 positions", function() {
        expect(positions.length).toBe(12);
      });
      it("position[0]", function() {
        expect(positions[0]).toBe(vec0.x);
      });
      it("position[1]", function() {
        expect(positions[1]).toBe(vec0.y);
      });
      it("position[2]", function() {
        expect(positions[2]).toBe(vec0.z);
      });
      it("position[3]", function() {
        expect(positions[3]).toBe(vec1.x);
      });
      it("position[4]", function() {
        expect(positions[4]).toBe(vec1.y);
      });
      it("position[5]", function() {
        expect(positions[5]).toBe(vec1.z);
      });
      it("position[6]", function() {
        expect(positions[6]).toBe(vec2.x);
      });
      it("position[7]", function() {
        expect(positions[7]).toBe(vec2.y);
      });
      it("position[8]", function() {
        expect(positions[8]).toBe(vec2.z);
      });
      it("position[9]", function() {
        expect(positions[9]).toBe(vec3.x);
      });
      it("position[10]", function() {
        expect(positions[10]).toBe(vec3.y);
      });
      it("position[11]", function() {
        expect(positions[11]).toBe(vec3.z);
      });
    });
    describe("tetrahedron", function() {
      var vecs = [];
      vecs.push(new Vector3([0, 0, 0]));
      vecs.push(new Vector3([1, 0, 0]));
      vecs.push(new Vector3([0, 1, 0]));
      vecs.push(new Vector3([0, 0, 1]));
      var f123 = new Face(vecs[1], vecs[2], vecs[3]);
      var f013 = new Face(vecs[0], vecs[1], vecs[3]);
      var f032 = new Face(vecs[0], vecs[3], vecs[2]);
      var f021 = new Face(vecs[0], vecs[2], vecs[1]);
      var faces = [];
      faces.push(f123);
      faces.push(f013);
      faces.push(f032);
      faces.push(f021);
      var elements = triangleElementsFromFaces(faces);
      var indices = elements.indices;
      var positions = elements.attributes['positions'];
      it("indices.length", function() {
        expect(indices.length).toBe(faces.length * 3);
      });
      it("indices[0]", function() {
        expect(indices[0]).toBe(0);
      });
      it("indices[1]", function() {
        expect(indices[1]).toBe(1);
      });
      it("indices[2]", function() {
        expect(indices[2]).toBe(2);
      });
      it("indices[3]", function() {
        expect(indices[3]).toBe(3);
      });
      it("indices[4]", function() {
        expect(indices[4]).toBe(4);
      });
      it("indices[5]", function() {
        expect(indices[5]).toBe(5);
      });
      it("indices[6]", function() {
        expect(indices[6]).toBe(6);
      });
      it("indices[7]", function() {
        expect(indices[7]).toBe(7);
      });
      it("indices[8]", function() {
        expect(indices[8]).toBe(8);
      });
      it("indices[9]", function() {
        expect(indices[9]).toBe(9);
      });
      it("indices[10]", function() {
        expect(indices[10]).toBe(10);
      });
      it("indices[11]", function() {
        expect(indices[11]).toBe(11);
      });
      it("positions.length", function() {
        expect(positions.length).toBe(faces.length * VERTICES_PER_FACE * COORDS_PER_POSITION);
      });
      it("position[0]", function() {
        expect(positions[0]).toBe(vecs[1].x);
      });
      it("position[1]", function() {
        expect(positions[1]).toBe(vecs[1].y);
      });
      it("position[2]", function() {
        expect(positions[2]).toBe(vecs[1].z);
      });
      it("position[3]", function() {
        expect(positions[3]).toBe(vecs[2].x);
      });
      it("position[4]", function() {
        expect(positions[4]).toBe(vecs[2].y);
      });
      it("position[5]", function() {
        expect(positions[5]).toBe(vecs[2].z);
      });
      it("position[6]", function() {
        expect(positions[6]).toBe(vecs[3].x);
      });
      it("position[7]", function() {
        expect(positions[7]).toBe(vecs[3].y);
      });
      it("position[8]", function() {
        expect(positions[8]).toBe(vecs[3].z);
      });
      it("position[9]", function() {
        expect(positions[9]).toBe(vecs[0].x);
      });
      it("position[10]", function() {
        expect(positions[10]).toBe(vecs[0].y);
      });
      it("position[11]", function() {
        expect(positions[11]).toBe(vecs[0].z);
      });
    });
  });
});