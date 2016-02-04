define(["require", "exports"], function (require, exports) {
    var Eight = (function () {
        function Eight() {
            this.fastPath = false;
            this.strict = false;
            this.GITHUB = 'https://github.com/geometryzen/davinci-eight';
            this.LAST_MODIFIED = '2016-02-03';
            this.NAMESPACE = 'EIGHT';
            this.verbose = false;
            this.VERSION = '2.176.0';
            this.logging = {};
        }
        return Eight;
    })();
    var core = new Eight();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = core;
});
