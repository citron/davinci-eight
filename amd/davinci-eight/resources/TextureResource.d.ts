import ITexture = require('../core/ITexture');
import IContextProvider = require('../core/IContextProvider');
import IContextMonitor = require('../core/IContextMonitor');
declare class TextureResource implements ITexture {
    private _gl;
    private _monitor;
    private _texture;
    private _refCount;
    private _uuid;
    private _target;
    constructor(monitors: IContextMonitor[], target: number);
    addRef(): number;
    release(): number;
    contextFree(): void;
    contextGain(manager: IContextProvider): void;
    contextLost(): void;
    /**
     * @method bind
     */
    bind(): void;
    /**
     * @method unbind
     */
    unbind(): void;
}
export = TextureResource;
