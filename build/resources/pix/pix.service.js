"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Pix_1 = __importDefault(require("../../database/entity/Pix"));
var User_1 = __importDefault(require("../../database/entity/User"));
var AppError_1 = __importDefault(require("../../shared/error/AppError"));
var pix_1 = __importDefault(require("../../utils/pix"));
var PixService = /** @class */ (function () {
    function PixService() {
    }
    PixService.prototype.request = function (value, user) {
        return __awaiter(this, void 0, void 0, function () {
            var pixRepository, userRepository, currentUser, requestData, register, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pixRepository = typeorm_1.getRepository(Pix_1.default);
                        userRepository = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepository.findOne({ where: { id: user.id } })];
                    case 1:
                        currentUser = _a.sent();
                        requestData = {
                            requestingUser: currentUser,
                            value: value,
                            status: "open",
                        };
                        return [4 /*yield*/, pixRepository.save(requestData)];
                    case 2:
                        register = _a.sent();
                        key = pix_1.default.encodeKey(user.id || "", value, register.id);
                        return [2 /*return*/, key];
                }
            });
        });
    };
    PixService.prototype.pay = function (key, user) {
        return __awaiter(this, void 0, void 0, function () {
            var keyDecoded, pixRepository, userRepository, requestingUser, payingUser, pixTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        try {
                            keyDecoded = pix_1.default.decodeKey(key);
                        }
                        catch (error) {
                            throw new AppError_1.default("Chave inválida!", 401);
                        }
                        if (keyDecoded.userId === user.id) {
                            throw new AppError_1.default("Não é possível receber o PIX do mesmo usuário", 401);
                        }
                        pixRepository = typeorm_1.getRepository(Pix_1.default);
                        userRepository = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepository.findOne({ where: { id: keyDecoded.userId } })];
                    case 1:
                        requestingUser = _a.sent();
                        return [4 /*yield*/, userRepository.findOne({ where: { id: user.id } })];
                    case 2:
                        payingUser = _a.sent();
                        if (payingUser.wallet < Number(keyDecoded.value)) {
                            throw new AppError_1.default("Não há saldo suficiente para realizar o pagamento", 401);
                        }
                        if (!requestingUser || !payingUser) {
                            throw new AppError_1.default("Não encontramos os clientes da transação, gere uma nova chave", 401);
                        }
                        requestingUser.wallet = Number(requestingUser.wallet) + Number(keyDecoded.value);
                        return [4 /*yield*/, userRepository.save(requestingUser)];
                    case 3:
                        _a.sent();
                        payingUser.wallet = Number(payingUser.wallet) - Number(keyDecoded.value);
                        return [4 /*yield*/, userRepository.save(payingUser)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, pixRepository.findOne({ where: { id: keyDecoded.registerID, status: "open" } })];
                    case 5:
                        pixTransaction = _a.sent();
                        if (!pixTransaction) {
                            throw new AppError_1.default("Chave inválida para pagamento", 401);
                        }
                        pixTransaction.status = "close";
                        pixTransaction.payingUser = payingUser;
                        return [4 /*yield*/, pixRepository.save(pixTransaction)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, { message: "Pagamento efetuado com sucesso" }];
                }
            });
        });
    };
    PixService.prototype.transactions = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var pixRepository, pixReceived, pixPaying, received, paying, allTransactions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pixRepository = typeorm_1.getRepository(Pix_1.default);
                        return [4 /*yield*/, pixRepository.find({ where: {
                                    requestingUser: user.id,
                                    status: "close",
                                },
                                relations: ["payingUser"],
                            })];
                    case 1: return [4 /*yield*/, (_a.sent())];
                    case 2:
                        pixReceived = _a.sent();
                        return [4 /*yield*/, pixRepository.find({ where: {
                                    payingUser: user.id,
                                    status: "close",
                                },
                                relations: ["requestingUser"],
                            })];
                    case 3:
                        pixPaying = _a.sent();
                        received = pixReceived.map(function (transactions) { return ({
                            value: transactions.value,
                            user: {
                                firstname: transactions.payingUser.firstName,
                                lastname: transactions.payingUser.lastName,
                            },
                            updatedAt: transactions.updatedAt,
                            type: "received"
                        }); });
                        paying = pixPaying.map(function (transactions) { return ({
                            value: transactions.value,
                            user: {
                                firstname: transactions.requestingUser.firstName,
                                lastname: transactions.requestingUser.lastName,
                            },
                            updatedAt: transactions.updatedAt,
                            type: "paid"
                        }); });
                        allTransactions = received.concat(paying);
                        allTransactions.sort(function (a, b) {
                            var dateA = new Date(a.updatedAt).getTime();
                            var dateB = new Date(b.updatedAt).getTime();
                            return dateA < dateB ? 1 : -1;
                        });
                        return [2 /*return*/, allTransactions];
                }
            });
        });
    };
    return PixService;
}());
exports.default = PixService;
//# sourceMappingURL=pix.service.js.map