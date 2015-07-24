var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../uniforms/DefaultUniformProvider', '../utils/uuid4'], function (require, exports, DefaultUniformProvider, uuid4) {
    var UniformVec2 = (function (_super) {
        __extends(UniformVec2, _super);
        function UniformVec2(name, id) {
            _super.call(this);
            this.$value = [0, 0];
            this.useValue = true;
            this.name = name;
            this.id = typeof id !== 'undefined' ? id : uuid4().generate();
        }
        Object.defineProperty(UniformVec2.prototype, "value", {
            set: function (value) {
                this.$value = value;
                this.useValue = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UniformVec2.prototype, "callback", {
            set: function (callback) {
                this.$callback = callback;
                this.useValue = false;
            },
            enumerable: true,
            configurable: true
        });
        UniformVec2.prototype.getUniformVector2 = function (name) {
            switch (name) {
                case this.name:
                    {
                        if (this.useValue) {
                            return this.$value;
                        }
                        else {
                            return this.$callback();
                        }
                    }
                    break;
                default: {
                    return _super.prototype.getUniformVector2.call(this, name);
                }
            }
        };
        UniformVec2.prototype.getUniformMetaInfos = function () {
            var uniforms = _super.prototype.getUniformMetaInfos.call(this);
            uniforms[this.id] = { name: this.name, glslType: 'vec2' };
            return uniforms;
        };
        return UniformVec2;
    })(DefaultUniformProvider);
    return UniformVec2;
});
