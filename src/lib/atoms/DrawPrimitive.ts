import { Attribute } from '../core/Attribute';
import { BeginMode } from '../core/BeginMode';
import { mustBeArray } from '../checks/mustBeArray';
import { mustBeInteger } from '../checks/mustBeInteger';
import { mustBeObject } from '../checks/mustBeObject';
import { Primitive } from '../core/Primitive';

const context = () => { return "DrawPrimitive constructor"; };

/**
 * A convenience class for implementing the Primitive interface.
 */
export class DrawPrimitive implements Primitive {
    public mode: BeginMode;
    public indices: number[];
    public attributes: { [name: string]: Attribute } = {};
    constructor(mode: BeginMode, indices: number[], attributes: { [name: string]: Attribute }) {
        this.mode = mustBeInteger('mode', mode, context);
        this.indices = mustBeArray('indices', indices, context);
        this.attributes = mustBeObject('attributes', attributes, context);
    }
}
