import VectorE3 = require('../math/VectorE3');
import isDefined = require('../checks/isDefined');
import Matrix4 = require('../math/Matrix4');
import perspectiveArray = require('../cameras/perspectiveArray');

function perspectiveMatrix(fov: number, aspect: number, near: number, far: number, matrix?: Matrix4): Matrix4 {
    let m: Matrix4 = isDefined(matrix) ? matrix : Matrix4.one();
    perspectiveArray(fov, aspect, near, far, m.elements);
    return m;
}

export = perspectiveMatrix;