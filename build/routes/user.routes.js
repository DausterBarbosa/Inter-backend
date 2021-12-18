"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userAuthenticated_1 = __importDefault(require("../middlewares/userAuthenticated"));
var user_controller_1 = __importDefault(require("../resources/user/user.controller"));
var userRouter = express_1.Router();
userRouter.post("/signin", user_controller_1.default.signin);
userRouter.post("/signup", user_controller_1.default.signup);
userRouter.get("/me", userAuthenticated_1.default, user_controller_1.default.me);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map