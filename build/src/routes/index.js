"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = __importDefault(require("./user.routes"));
var pix_routes_1 = __importDefault(require("./pix.routes"));
var routes = express_1.Router();
routes.use("/user", user_routes_1.default);
routes.use("/pix", pix_routes_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map