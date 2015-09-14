var shaderProgram = require('../programs/shaderProgram');
var expectArg = require('../checks/expectArg');
/**
 * @method programFromScripts
 * @param monitor {ContextManager}
 * @param vsId {string} The vertex shader script element identifier.
 * @param fsId {string} The fragment shader script element identifier.
 * @param $document {Document} The document containing the script elements.
 */
function programFromScripts(monitor, vsId, fsId, $document, attribs) {
    if (attribs === void 0) { attribs = []; }
    expectArg('vsId', vsId).toBeString();
    expectArg('fsId', fsId).toBeString();
    expectArg('$document', $document).toBeObject();
    function $(id) {
        expectArg('id', id).toBeString();
        var element = $document.getElementById(id);
        if (element) {
            return element;
        }
        else {
            throw new Error(id + " is not a valid DOM element identifier.");
        }
    }
    var vertexShader = $(vsId).textContent;
    var fragmentShader = $(fsId).textContent;
    return shaderProgram(monitor, vertexShader, fragmentShader, attribs);
}
module.exports = programFromScripts;