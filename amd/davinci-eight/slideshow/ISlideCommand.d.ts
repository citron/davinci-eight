import ISlideHost = require('../slideshow/ISlideHost');
import IUnknown = require('../core/IUnknown');
interface ISlideCommand extends IUnknown {
    redo(host: ISlideHost): void;
    undo(host: ISlideHost): void;
}
export = ISlideCommand;
