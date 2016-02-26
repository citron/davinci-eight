import MeshMaterial from './MeshMaterial'

describe("MeshMaterial", function() {
    const material = new MeshMaterial()
    it("should contain aPosition", function() {
        expect(material.vertexShader).toContain("attribute vec3 aPosition;")
    })
})