"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv/config');
exports.default = {
    jwt: {
        secret: process.env.SECRET,
        expiresIn: process.env.EXPIRESIN,
    }
};
//# sourceMappingURL=auth.js.map