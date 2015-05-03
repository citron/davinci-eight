import Geometry = require('davinci-eight/core/Geometry');
import Euclidean3 = require('davinci-blade/Euclidean3');
declare var eight: {
    'VERSION': string;
    perspective: (fov?: number, aspect?: number, near?: number, far?: number) => {
        position: Euclidean3;
        attitude: Euclidean3;
        aspect: number;
        projectionMatrix: number[];
    };
    Euclidean3: typeof Euclidean3;
    scalarE3: (w: number) => Euclidean3;
    vectorE3: (x: number, y: number, z: number) => Euclidean3;
    bivectorE3: (xy: number, yz: number, zx: number) => Euclidean3;
    scene: () => Scene;
    object3D: () => {
        position: Euclidean3;
        attitude: Euclidean3;
        onContextGain: (gl: any) => void;
        onContextLoss: () => void;
        tearDown: () => void;
        updateMatrix: () => void;
        draw: (projectionMatrix: any) => void;
    };
    renderer: (parameters?: any) => {
        canvas: HTMLCanvasElement;
        context: WebGLRenderingContext;
        onContextGain: (context: WebGLRenderingContext) => void;
        onContextLoss: () => void;
        clearColor: (r: number, g: number, b: number, a: number) => void;
        render: (scene: any, camera: {
            projectionMatrix: any;
        }) => void;
        viewport: (x: any, y: any, width: any, height: any) => void;
        setSize: (width: any, height: any, updateStyle: any) => void;
    };
    contextMonitor: (canvas: HTMLCanvasElement, contextLoss: () => void, contextGain: (gl: WebGLRenderingContext) => void) => {
        start: () => void;
        stop: () => void;
    };
    workbench: (canvas: HTMLCanvasElement, renderer: any, camera: {
        aspect: number;
    }, win?: Window) => {
        setUp: () => void;
        tearDown: () => void;
    };
    animationRunner: (tick: (t: number) => void, terminate: (t: number) => void, setUp: () => void, tearDown: (ex: any) => void, win?: Window) => {
        start: () => void;
        stop: () => void;
    };
    mesh: (geometry?: x.Geometry, material?: any) => Mesh;
    geometry: (spec?: any) => x.Geometry;
    box: (spec?: any) => Geometry;
    prism: (spec?: any) => x.Geometry;
    material: (spec?: any) => Material;
    meshBasicMaterial: (spec: any) => Material;
    meshNormalMaterial: (spec: any) => Material;
};
export = eight;
