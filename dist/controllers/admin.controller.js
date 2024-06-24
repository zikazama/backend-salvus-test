"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.deleteOvertime = exports.updateOvertime = exports.getOvertime = exports.listOvertimes = exports.createOvertime = exports.getTransactionWithItems = exports.deleteConfig = exports.updateConfig = exports.getConfig = exports.createConfig = exports.listConfigs = exports.adminLogin = void 0;
var typeorm_1 = require("typeorm");
var Admin_1 = require("../entity/Admin");
var Config_1 = require("../entity/Config");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var uuid_1 = require("uuid");
dotenv_1.default.config();
var pagination_1 = require("../utils/pagination");
var response_1 = require("../utils/response");
var OvertimeAssigment_1 = require("../entity/OvertimeAssigment");
// POST /api/login/admin
var adminLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, adminRepository, admin, validPassword, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                adminRepository = (0, typeorm_1.getRepository)(Admin_1.Admin);
                return [4 /*yield*/, adminRepository.findOne({ where: { email: email, deleted_at: (0, typeorm_1.IsNull)() } })];
            case 1:
                admin = _b.sent();
                if (!admin)
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, admin.password)];
            case 2:
                validPassword = _b.sent();
                if (!validPassword)
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                token = jsonwebtoken_1.default.sign({ admin_uid: admin.admin_uid, role: 'admin', email: admin.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                (0, response_1.successResponse)(res, { token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.adminLogin = adminLogin;
// GET /api/configs
var listConfigs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, size, _b, limit, offset, configRepository, _c, configs, total, response;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, page = _a.page, size = _a.size;
                _b = (0, pagination_1.getPagination)(Number(page), Number(size)), limit = _b.limit, offset = _b.offset;
                configRepository = (0, typeorm_1.getRepository)(Config_1.Config);
                return [4 /*yield*/, configRepository.findAndCount({
                        take: limit,
                        skip: offset,
                        where: { deleted_at: (0, typeorm_1.IsNull)() },
                    })];
            case 1:
                _c = _d.sent(), configs = _c[0], total = _c[1];
                response = (0, pagination_1.getPagingData)([configs, total], Number(page), limit);
                (0, response_1.successPaginateResponse)(res, response);
                return [2 /*return*/];
        }
    });
}); };
exports.listConfigs = listConfigs;
// POST /api/configs
var createConfig = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var configRepository, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                configRepository = (0, typeorm_1.getRepository)(Config_1.Config);
                return [4 /*yield*/, configRepository.save(__assign(__assign({}, req.body), { config_uid: (0, uuid_1.v4)(), created_at: new Date(), updated_at: new Date() }))];
            case 1:
                config = _a.sent();
                (0, response_1.successResponse)(res, config, 'Success created data', 201);
                return [2 /*return*/];
        }
    });
}); };
exports.createConfig = createConfig;
// GET /api/configs/:config_uid
var getConfig = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var configRepository, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                configRepository = (0, typeorm_1.getRepository)(Config_1.Config);
                return [4 /*yield*/, configRepository.findOne({
                        where: { config_uid: req.params.config_uid, deleted_at: (0, typeorm_1.IsNull)() },
                    })];
            case 1:
                config = _a.sent();
                (0, response_1.successResponse)(res, config);
                return [2 /*return*/];
        }
    });
}); };
exports.getConfig = getConfig;
// PUT /api/configs/:config_uid
var updateConfig = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var configRepository, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                configRepository = (0, typeorm_1.getRepository)(Config_1.Config);
                return [4 /*yield*/, configRepository.update({
                        config_uid: req.params.config_uid,
                        deleted_at: (0, typeorm_1.IsNull)()
                    }, __assign(__assign({}, req.body), { updated_at: new Date() }))];
            case 1:
                config = _a.sent();
                (0, response_1.successResponse)(res, config, 'Success updated data', 201);
                return [2 /*return*/];
        }
    });
}); };
exports.updateConfig = updateConfig;
// DELETE /api/configs/:config_uid
var deleteConfig = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var configRepository, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                configRepository = (0, typeorm_1.getRepository)(Config_1.Config);
                return [4 /*yield*/, configRepository.update({
                        config_uid: req.params.config_uid
                    }, {
                        deleted_at: new Date(),
                    })];
            case 1:
                config = _a.sent();
                (0, response_1.successResponse)(res, config, 'Success deleted data', 204);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteConfig = deleteConfig;
// GET /api/transactions-with-items
var getTransactionWithItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionRepository, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionRepository = (0, typeorm_1.getRepository)(typeorm_1.Transaction);
                return [4 /*yield*/, transactionRepository.findOne({
                        where: { deleted_at: (0, typeorm_1.IsNull)() },
                        relations: ['transaction_items']
                    })];
            case 1:
                config = _a.sent();
                (0, response_1.successResponse)(res, config);
                return [2 /*return*/];
        }
    });
}); };
exports.getTransactionWithItems = getTransactionWithItems;
// POST /api/overtimes
var createOvertime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var overtimeRepository, overtime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                overtimeRepository = (0, typeorm_1.getRepository)(OvertimeAssigment_1.OvertimeAssignment);
                return [4 /*yield*/, overtimeRepository.save(__assign(__assign({}, req.body), { overtime_assigment_uid: (0, uuid_1.v4)(), created_at: new Date(), updated_at: new Date() }))];
            case 1:
                overtime = _a.sent();
                (0, response_1.successResponse)(res, overtime, 'Success created data', 201);
                return [2 /*return*/];
        }
    });
}); };
exports.createOvertime = createOvertime;
// GET /api/overtimes
var listOvertimes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, size, _b, limit, offset, overtimeRepository, _c, overtimes, total, response;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, page = _a.page, size = _a.size;
                _b = (0, pagination_1.getPagination)(Number(page), Number(size)), limit = _b.limit, offset = _b.offset;
                overtimeRepository = (0, typeorm_1.getRepository)(OvertimeAssigment_1.OvertimeAssignment);
                return [4 /*yield*/, overtimeRepository.findAndCount({
                        take: limit,
                        skip: offset,
                        where: { deleted_at: (0, typeorm_1.IsNull)() },
                    })];
            case 1:
                _c = _d.sent(), overtimes = _c[0], total = _c[1];
                response = (0, pagination_1.getPagingData)([overtimes, total], Number(page), limit);
                (0, response_1.successPaginateResponse)(res, response);
                return [2 /*return*/];
        }
    });
}); };
exports.listOvertimes = listOvertimes;
// GET /api/overtimes/:overtime_assigment_uid
var getOvertime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var overtimeRepository, overtime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                overtimeRepository = (0, typeorm_1.getRepository)(OvertimeAssigment_1.OvertimeAssignment);
                return [4 /*yield*/, overtimeRepository.findOne({
                        where: { overtime_assigment_uid: req.params.overtime_assigment_uid, deleted_at: (0, typeorm_1.IsNull)() },
                    })];
            case 1:
                overtime = _a.sent();
                (0, response_1.successResponse)(res, overtime);
                return [2 /*return*/];
        }
    });
}); };
exports.getOvertime = getOvertime;
// PUT /api/overtimes/:overtime_assigment_uid
var updateOvertime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var overtimeRepository, overtime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                overtimeRepository = (0, typeorm_1.getRepository)(OvertimeAssigment_1.OvertimeAssignment);
                return [4 /*yield*/, overtimeRepository.update({
                        overtime_assigment_uid: req.params.overtime_assigment_uid,
                        deleted_at: (0, typeorm_1.IsNull)()
                    }, __assign(__assign({}, req.body), { updated_at: new Date() }))];
            case 1:
                overtime = _a.sent();
                (0, response_1.successResponse)(res, overtime, 'Success updated data', 201);
                return [2 /*return*/];
        }
    });
}); };
exports.updateOvertime = updateOvertime;
// DELETE /api/overtimes/:overtime_assigment_uid
var deleteOvertime = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var overtimeRepository, overtime;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                overtimeRepository = (0, typeorm_1.getRepository)(OvertimeAssigment_1.OvertimeAssignment);
                return [4 /*yield*/, overtimeRepository.update({
                        overtime_assigment_uid: req.params.overtime_assigment_uid
                    }, {
                        deleted_at: new Date(),
                    })];
            case 1:
                overtime = _a.sent();
                (0, response_1.successResponse)(res, overtime, 'Success deleted data', 204);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteOvertime = deleteOvertime;
