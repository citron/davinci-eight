import { IKeyboardHandler } from '../devices/IKeyboardHandler';
import { ShareableBase } from '../core/ShareableBase';
export declare class Keyboard extends ShareableBase {
    private handler;
    private document;
    private useCapture;
    private keyDownHandler;
    private keyUpHandler;
    currentlyPressedKeys: boolean[];
    constructor(handler: IKeyboardHandler, document?: Document);
    protected destructor(levelUp: number): void;
    attach(handler: IKeyboardHandler, document?: Document, useCapture?: boolean): void;
    detach(): void;
}
