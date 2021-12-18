"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("./User"));
var Pix = /** @class */ (function () {
    function Pix() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn("uuid"),
        __metadata("design:type", String)
    ], Pix.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Pix.prototype, "status", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Pix.prototype, "value", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Pix.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Pix.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }, function (user) { return user.id; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.default)
    ], Pix.prototype, "requestingUser", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.default; }, function (user) { return user.id; }, { nullable: true }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.default)
    ], Pix.prototype, "payingUser", void 0);
    Pix = __decorate([
        typeorm_1.Entity()
    ], Pix);
    return Pix;
}());
exports.default = Pix;
//# sourceMappingURL=Pix.js.map