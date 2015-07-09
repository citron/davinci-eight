import Matrix4 = require('../math/Matrix4');
declare class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    add(v: Vector3): Vector3;
    applyMatrix4(m: Matrix4): Vector3;
    applyQuaternion(q: {
        x: number;
        y: number;
        z: number;
        w: number;
    }): Vector3;
    copy(v: Vector3): Vector3;
    cross(v: Vector3): Vector3;
    crossVectors(a: Vector3, b: Vector3): Vector3;
    distance(v: Vector3): number;
    quadrance(v: Vector3): number;
    divideScalar(scalar: number): Vector3;
    dot(v: Vector3): number;
    length(): number;
    lerp(v: Vector3, alpha: number): Vector3;
    normalize(): Vector3;
    multiply(v: Vector3): Vector3;
    multiplyScalar(scalar: number): Vector3;
    set(x: number, y: number, z: number): Vector3;
    setX(x: number): Vector3;
    setY(y: number): Vector3;
    setZ(z: number): Vector3;
    sub(v: Vector3): Vector3;
    subVectors(a: Vector3, b: Vector3): Vector3;
    clone(): Vector3;
}
export = Vector3;
