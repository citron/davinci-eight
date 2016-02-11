import mustBeNumber from '../checks/mustBeNumber';
import visualCache from './visualCache';
import VisualBody from './VisualBody'
import VisualOptions from './VisualOptions'

/**
 * @module EIGHT
 * @submodule visual
 */

/**
 * @class Cuboid
 * @extends RigidBody
 */
export default class Cuboid extends VisualBody {
    constructor(options: VisualOptions = {}) {
        super(visualCache.cuboid(options), visualCache.material(options), 'Cuboid')
        this._geometry.release()
        this._material.release()
    }
    protected destructor(): void {
        super.destructor()
    }
    get width(): number {
        return this.getScaleX()
    }
    set width(width: number) {
        mustBeNumber('width', width)
        this.setScaleX(width)
    }
    get height(): number {
        return this.getScaleY()
    }
    set height(height: number) {
        mustBeNumber('height', height)
        this.setScaleY(height)
    }
    get depth(): number {
        return this.getScaleZ()
    }
    set depth(depth: number) {
        mustBeNumber('depth', depth)
        this.setScaleZ(depth)
    }
}