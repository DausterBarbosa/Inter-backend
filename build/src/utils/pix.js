"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var js_base64_1 = require("js-base64");
var Pix = /** @class */ (function () {
    function Pix() {
    }
    Pix.prototype.encodeKey = function (userID, value, registerID) {
        var part1 = js_base64_1.encode(userID);
        var part2 = js_base64_1.encode(value.toString());
        var part3 = js_base64_1.encode(registerID);
        return part1 + "-" + part2 + "-" + part3;
    };
    Pix.prototype.decodeKey = function (key) {
        var decodeKey = key.split("-");
        var userId = js_base64_1.decode(decodeKey[0]);
        var value = js_base64_1.decode(decodeKey[1]);
        var registerID = js_base64_1.decode(decodeKey[2]);
        return {
            userId: userId,
            value: value,
            registerID: registerID,
        };
    };
    return Pix;
}());
exports.default = new Pix();
//# sourceMappingURL=pix.js.map