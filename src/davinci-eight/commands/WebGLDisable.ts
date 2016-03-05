import Capability from '../commands/Capability';
import glCapability from '../commands/glCapability';
import ContextConsumer from '../core/ContextConsumer';
import ContextProvider from '../core/ContextProvider';
import mustBeNumber from '../checks/mustBeNumber';
import ShareableBase from '../core/ShareableBase';

/**
 * <p>
 * disable(capability: Capability): void
 * <p> 
 * @class WebGLDisable
 * @extends ShareableBase
 * @implements ContextConsumer
 */
export default class WebGLDisable extends ShareableBase implements ContextConsumer {
    private _capability: Capability;
    /**
     * @class WebGLDisable
     * @constructor
     * @param capability {string} The name of the WebGLRenderingContext property to be disabled.
     */
    constructor(capability: Capability) {
        super('WebGLDisable')
        this._capability = mustBeNumber('capability', capability)
    }

    contextFree(manager: ContextProvider): void {
        // do nothing
    }

    contextGain(manager: ContextProvider): void {
        manager.gl.disable(glCapability(this._capability, manager.gl))
    }

    contextLost(): void {
        // do nothing
    }

    /**
     * @method destructor
     * @return {void}
     * @protected
     */
    protected destructor(): void {
        this._capability = void 0
        super.destructor()
    }
}
