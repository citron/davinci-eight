import IContextProvider = require('../core/IContextProvider');
import ContextMonitor = require('../core/ContextMonitor');
import IDrawable = require('../core/IDrawable');
import IDrawList = require('../scene/IDrawList');
import IMaterial = require('../core/IMaterial');
import Shareable = require('../utils/Shareable');
import UniformData = require('../core/UniformData');
/**
 * @class Scene
 * @extends Shareable
 * @extends IDrawList
 */
declare class Scene extends Shareable implements IDrawList {
    private drawList;
    private monitors;
    /**
     * <p>
     * A <code>Scene</code> is a collection of drawable instances arranged in some order.
     * The precise order is implementation defined.
     * The collection may be traversed for general processing using callback/visitor functions.
     * </p>
     * @class Scene
     * @constructor
     * @param monitors [ContextMonitor[]=[]]
     */
    constructor(monitors?: ContextMonitor[]);
    /**
     * @method destructor
     * @return {void}
     * @protected
     */
    protected destructor(): void;
    /**
     * <p>
     * Adds the <code>drawable</code> to this <code>Scene</code>.
     * </p>
     * @method add
     * @param drawable {IDrawable}
     * @return {Void}
     * <p>
     * This method returns <code>undefined</code>.
     * </p>
     */
    add(drawable: IDrawable): void;
    /**
     * <p>
     * Traverses the collection of drawables, drawing each one.
     * </p>
     * @method draw
     * @param ambients {UniformData}
     * @param canvasId {number}
     * @return {void}
     * @beta
     */
    draw(ambients: UniformData, canvasId: number): void;
    /**
     * <p>
     * Removes the <code>drawable</code> from this <code>Scene</code>.
     * </p>
     * @method remove
     * @param drawable {IDrawable}
     * @return {Void}
     * <p>
     * This method returns <code>undefined</code>.
     * </p>
     */
    remove(drawable: IDrawable): void;
    /**
     * <p>
     * Traverses the collection of drawables, calling the specified callback arguments.
     * </p>
     * @method traverse
     * @param callback {(drawable: IDrawable) => void} Callback function for each drawable.
     * @param canvasId {number} Identifies the canvas.
     * @param prolog {(material: IMaterial) => void} Callback function for each material.
     * @return {void}
     */
    traverse(callback: (drawable: IDrawable) => void, canvasId: number, prolog: (material: IMaterial) => void): void;
    contextFree(canvasId: number): void;
    contextGain(manager: IContextProvider): void;
    contextLost(canvasId: number): void;
}
export = Scene;
