var LineVertex = (function () {
    function LineVertex(position, normal) {
        this.position = position;
        this.normal = normal;
    }
    return LineVertex;
})();
module.exports = LineVertex;
