"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Eight = (function () {
    function Eight() {
        this.GITHUB = 'https://github.com/geometryzen/davinci-eight';
        this.LAST_MODIFIED = '2017-08-04';
        this.NAMESPACE = 'EIGHT';
        this.VERSION = '7.0.3';
    }
    Eight.prototype.log = function (message) {
        // This should allow us to unit test and run in environments without a console.
        console.log(message);
    };
    Eight.prototype.info = function (message) {
        // This should allow us to unit test and run in environments without a console.
        console.log(message);
    };
    Eight.prototype.warn = function (message) {
        // This should allow us to unit test and run in environments without a console.
        console.warn(message);
    };
    Eight.prototype.error = function (message) {
        // This should allow us to unit test and run in environments without a console.
        console.error(message);
    };
    return Eight;
}());
exports.Eight = Eight;
/**
 *
 */
exports.config = new Eight();
