"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userAuthenticated_1 = __importDefault(require("../middlewares/userAuthenticated"));
var pix_controller_1 = __importDefault(require("../resources/pix/pix.controller"));
var pixRouter = express_1.Router();
pixRouter.use(userAuthenticated_1.default);
pixRouter.post("/request", pix_controller_1.default.request);
pixRouter.post("/pay/:key", pix_controller_1.default.pay);
pixRouter.get("/transactions", pix_controller_1.default.transactions);
exports.default = pixRouter;
//# sourceMappingURL=pix.routes.js.map