import core = require('davinci-eight/core');
import Color = require('../core/Color');
import Drawable = require('../core/Drawable');
import DrawContext = require('../core/DrawContext');
import Viewport = require('../renderers/Viewport');
import ViewportParameters = require('../renderers/ViewportParameters');
import ViewportArgs = require('../renderers/ViewportArgs');
import World = require('../worlds/World');
import UniformProvider = require('../core/UniformProvider');
//import initWebGL = require('../renderers/initWebGL');
//import FrameworkDrawContext = require('../renderers/FrameworkDrawContext');

let viewport = function(parameters?: ViewportParameters): Viewport {

    parameters = parameters || {};

    let canvas: HTMLCanvasElement = parameters.canvas !== undefined ? parameters.canvas : document.createElement('canvas');
    var alpha: boolean = parameters.alpha !== undefined ? parameters.alpha : false;
    var depth: boolean = parameters.depth !== undefined ? parameters.depth : true;
    var stencil: boolean = parameters.stencil !== undefined ? parameters.stencil : true;
    var antialias: boolean = parameters.antialias !== undefined ? parameters.antialias : false;
    var premultipliedAlpha: boolean = parameters.premultipliedAlpha !== undefined ? parameters.premultipliedAlpha : true;
    var preserveDrawingBuffer: boolean = parameters.preserveDrawingBuffer !== undefined ? parameters.preserveDrawingBuffer : false;

    //var drawContext = new FrameworkDrawContext();
    var context: WebGLRenderingContext;
    var contextGainId: string;
    var devicePixelRatio = 1;
    var autoClearColor: boolean = true;
    var autoClearDepth: boolean = true;
    let clearColor: Color = new Color(1.0, 1.0, 1.0, 1.0);
    // If we had an active context then we might use context.drawingBufferWidth etc.
    let viewport: ViewportArgs = new ViewportArgs(0, 0, canvas.width, canvas.height);

    function setViewport(x: number, y: number, width: number, height: number): void {
      if (context) {
        context.viewport(x * devicePixelRatio, y * devicePixelRatio, width * devicePixelRatio, height * devicePixelRatio);
      }
    }

    function clear() {
      var mask: number = 0;
      if (context)
      {
        if (autoClearColor)
        {
          mask |= context.COLOR_BUFFER_BIT;
        }
        if (autoClearDepth)
        {
          mask |= context.DEPTH_BUFFER_BIT;
        }
        context.clear(mask);
      }
    }

    var publicAPI: Viewport = {
      get canvas() { return canvas; },
      get context(): WebGLRenderingContext { return context;},
      contextFree: function() {
        context = void 0;
      },
      contextGain: function(contextArg: WebGLRenderingContext, contextGainId: string) {
        context = contextArg;
        context.enable(context.DEPTH_TEST);
        context.enable(context.SCISSOR_TEST);
      },
      contextLoss: function() {
        context = void 0;
      },
      hasContext: function() {
        return !!context;
      },
      clearColor(red: number, green: number, blue: number, alpha: number)
      {
        clearColor.red = red;
        clearColor.green = green;
        clearColor.blue = blue;
        clearColor.alpha = alpha;
        //
      },
      render(world: World, views: UniformProvider[]) {
        if (context) {
          context.scissor(viewport.x, viewport.y, viewport.width, viewport.height);
          context.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
          context.clearColor(clearColor.red, clearColor.green, clearColor.blue, clearColor.alpha);
          clear();
          var drawGroups: {[programId:string]: Drawable[]} = {};
          if (!world.hasContext()) {
            world.contextGain(context, contextGainId);
          }
          var programLoaded;
          var drawHandler = function(drawable: Drawable, index: number) {
            if (!programLoaded) {
              drawable.useProgram();
              programLoaded = true;
            }
            views.forEach(function(view) {
              drawable.draw(view);
            });
          };
          for (var drawGroupName in world.drawGroups) {
            programLoaded = false;
            world.drawGroups[drawGroupName].forEach(drawHandler);
          }
        }
      },
      setViewport: setViewport,
      get x(): number {
        return viewport.x;
      },
      set x(value: number) {
        viewport.x = value;
      },
      get y(): number {
        return viewport.y;
      },
      set y(value: number) {
        viewport.y = value;
      },
      get width(): number {
        return viewport.width;
      },
      set width(value: number) {
        viewport.width = value;
      },
      get height(): number {
        return viewport.height;
      },
      set height(value: number) {
        viewport.height = value;
      },
      setSize(width: number, height: number, updateStyle?: boolean)
      {
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        if (updateStyle !== false) {
          canvas.style.width = width + 'px';
          canvas.style.height = height + 'px';
        }
        setViewport(0, 0, width, height);
      }
    };

    var attributes =
    {
      'alpha': alpha,
      'depth': depth,
      'stencil': stencil,
      'antialias': antialias,
      'premultipliedAlpha': premultipliedAlpha,
      'preserveDrawingBuffer': preserveDrawingBuffer
    };

    return publicAPI;
};

export = viewport;