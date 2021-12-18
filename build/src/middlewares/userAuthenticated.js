"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var AppError_1 = __importDefault(require("../shared/error/AppError"));
var auth_1 = __importDefault(require("../config/auth"));
function userAuthenticated(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default("Não foi enviado o token JWT.", 401);
    }
    var _a = authHeader.split(" "), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var _b = decoded, sub = _b.sub, firstName = _b.firstName, lastName = _b.lastName;
        req.user = {
            id: sub,
            firstName: firstName,
            lastName: lastName
        };
        return next();
    }
    catch (error) {
        throw new AppError_1.default("Token JWT inválido.", 401);
    }
}
exports.default = userAuthenticated;
//# sourceMappingURL=userAuthenticated.js.map