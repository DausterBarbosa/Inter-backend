"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(message, statuscode, data) {
        if (statuscode === void 0) { statuscode = 400; }
        this.message = message;
        this.statuscode = statuscode;
        this.data = data;
    }
    return AppError;
}());
exports.default = AppError;
//# sourceMappingURL=AppError.js.map