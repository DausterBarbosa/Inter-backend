"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("../shared/error/AppError"));
function globalErrors(err, req, res, next) {
    if (err instanceof AppError_1.default) {
        return res.status(err.statuscode).json({
            status: "error",
            message: err.message,
            data: err.data
        });
    }
    console.log(err);
    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
}
exports.default = globalErrors;
//# sourceMappingURL=globalErrors.js.map