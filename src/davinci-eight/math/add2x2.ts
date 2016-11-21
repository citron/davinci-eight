export default function add2x2(a: Float32Array, b: Float32Array, c: Float32Array): Float32Array {

    const a11 = a[0x0], a12 = a[0x2];
    const a21 = a[0x1], a22 = a[0x3];

    const b11 = b[0x0], b12 = b[0x2];
    const b21 = b[0x1], b22 = b[0x3];

    c[0x0] = a11 + b11;
    c[0x2] = a12 + b12;

    c[0x1] = a21 + b21;
    c[0x3] = a22 + b22;

    return c;
}
