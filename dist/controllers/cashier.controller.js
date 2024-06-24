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
exports.deleteTransactionItem = exports.updateTransactionItem = exports.getTransactionItem = exports.listTransactionItems = exports.createTransactionItem = exports.deleteTransaction = exports.updateTransaction = exports.getTransaction = exports.listTransactions = exports.createTransaction = exports.dashboard = exports.login = void 0;
var typeorm_1 = require("typeorm");
var response_1 = require("../utils/response");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var pagination_1 = require("../utils/pagination");
var OvertimeAssigment_1 = require("../entity/OvertimeAssigment");
var Transaction_1 = require("../entity/Transaction");
var Cashier_1 = require("../entity/Cashier");
var moment_1 = __importDefault(require("moment"));
var TransactionItem_1 = require("../entity/TransactionItem");
var uuid_1 = require("uuid");
// POST /api/login
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, cashierRepository, cashier, validPassword, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                cashierRepository = (0, typeorm_1.getRepository)(Cashier_1.Cashier);
                return [4 /*yield*/, cashierRepository.findOne({ where: { email: email, deleted_at: (0, typeorm_1.IsNull)() } })];
            case 1:
                cashier = _b.sent();
                if (!cashier)
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                return [4 /*yield*/, bcrypt_1.default.compare(password, cashier.password)];
            case 2:
                validPassword = _b.sent();
                if (!validPassword)
                    return [2 /*return*/, res.status(401).json({ message: 'Invalid credentials' })];
                token = jsonwebtoken_1.default.sign({ cashier_uid: cashier.cashier_uid, role: 'cashier', email: cashier.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                (0, response_1.successResponse)(res, { token: token });
                return [2 /*return*/];
        }
    });
}); };
exports.login = login;
// GET /api/dashboard
var dashboard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var overtimeRepository, transactionRepository, transactionItemRepository, overtimes, transactions, transaction_ids, transaction_items, total_overtime, total_transaction, total_transaction_item, total_menu;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                overtimeRepository = (0, typeorm_1.getRepository)(OvertimeAssigment_1.OvertimeAssignment);
                transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
                transactionItemRepository = (0, typeorm_1.getRepository)(TransactionItem_1.TransactionItem);
                return [4 /*yield*/, overtimeRepository.createQueryBuilder('o')
                        .andWhere('DATE(o.createdAt) = CURDATE()')
                        .andWhere({
                        deleted_at: (0, typeorm_1.IsNull)()
                    })
                        .getMany()];
            case 1:
                overtimes = _a.sent();
                return [4 /*yield*/, transactionRepository.createQueryBuilder('t')
                        .andWhere('DATE(t.createdAt) = CURDATE()')
                        .andWhere({
                        deleted_at: (0, typeorm_1.IsNull)()
                    })
                        .getMany()];
            case 2:
                transactions = _a.sent();
                transaction_ids = transactions.map(function (t) { return t.transaction_id; });
                return [4 /*yield*/, transactionItemRepository.createQueryBuilder('ti')
                        .where('ti.transaction_id IN (:...transaction_ids)', { transaction_ids: transaction_ids })
                        .getMany()];
            case 3:
                transaction_items = _a.sent();
                total_overtime = overtimes.reduce(function (acc, o) { return acc + o.overtime_hour; }, 0);
                total_transaction = transactions.reduce(function (acc, t) { return acc + t.total_transaction; }, 0);
                total_transaction_item = transaction_items.reduce(function (acc, ti) { return acc + ti.subtotal; }, 0);
                total_menu = transaction_items.reduce(function (acc, ti) { return acc + ti.quantity; }, 0);
                (0, response_1.successResponse)(res, {
                    total_overtime: total_overtime,
                    total_transaction: total_transaction,
                    total_transaction_item: total_transaction_item,
                    total_menu: total_menu,
                });
                return [2 /*return*/];
        }
    });
}); };
exports.dashboard = dashboard;
// POST /api/transactions
var createTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionRepository, transaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
                return [4 /*yield*/, transactionRepository.save(__assign(__assign({}, req.body), { config_uid: (0, uuid_1.v4)(), created_at: new Date(), updated_at: new Date() }))];
            case 1:
                transaction = _a.sent();
                (0, response_1.successResponse)(res, transaction, 'Success created data', 201);
                return [2 /*return*/];
        }
    });
}); };
exports.createTransaction = createTransaction;
// GET /api/transactions
var listTransactions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, size, _b, limit, offset, transactionRepository, _c, configs, total, response;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, page = _a.page, size = _a.size;
                _b = (0, pagination_1.getPagination)(Number(page), Number(size)), limit = _b.limit, offset = _b.offset;
                transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
                return [4 /*yield*/, transactionRepository.findAndCount({
                        take: limit,
                        skip: offset,
                        where: { deleted_at: (0, typeorm_1.IsNull)(), created_at: (0, typeorm_1.MoreThan)((0, moment_1.default)().format('YYYY-MM-DD')) },
                    })];
            case 1:
                _c = _d.sent(), configs = _c[0], total = _c[1];
                response = (0, pagination_1.getPagingData)([configs, total], Number(page), limit);
                (0, response_1.successPaginateResponse)(res, response);
                return [2 /*return*/];
        }
    });
}); };
exports.listTransactions = listTransactions;
// GET /api/transactions/:transaction_uid
var getTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionRepository, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
                return [4 /*yield*/, transactionRepository.findOne({
                        where: { transaction_uid: req.params.transaction_uid, deleted_at: (0, typeorm_1.IsNull)() },
                    })];
            case 1:
                config = _a.sent();
                (0, response_1.successResponse)(res, config);
                return [2 /*return*/];
        }
    });
}); };
exports.getTransaction = getTransaction;
// PUT /api/transactions/:transaction_uid
var updateTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var configRepository, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                configRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
                return [4 /*yield*/, configRepository.update({
                        transaction_uid: req.params.transaction_uid,
                        deleted_at: (0, typeorm_1.IsNull)()
                    }, __assign(__assign({}, req.body), { updated_at: new Date() }))];
            case 1:
                config = _a.sent();
                (0, response_1.successResponse)(res, config, 'Success updated data', 201);
                return [2 /*return*/];
        }
    });
}); };
exports.updateTransaction = updateTransaction;
// DELETE /api/transactions/:transaction_id
var deleteTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var configRepository, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                configRepository = (0, typeorm_1.getRepository)(Transaction_1.Transaction);
                return [4 /*yield*/, configRepository.update({
                        transaction_uid: req.params.transaction_uid
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
exports.deleteTransaction = deleteTransaction;
// POST /api/transactions/:transaction_uid/transaction-item
var createTransactionItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionItemRepository, transactionItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionItemRepository = (0, typeorm_1.getRepository)(TransactionItem_1.TransactionItem);
                return [4 /*yield*/, transactionItemRepository.save(__assign(__assign({}, req.body), { transaction_item_uid: (0, uuid_1.v4)(), created_at: new Date(), updated_at: new Date() }))];
            case 1:
                transactionItem = _a.sent();
                (0, response_1.successResponse)(res, transactionItem, 'Success created data', 201);
                return [2 /*return*/];
        }
    });
}); };
exports.createTransactionItem = createTransactionItem;
// GET /api/transactions/:transaction_uid/transaction-item
var listTransactionItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, size, _b, limit, offset, transactionItemRepository, _c, transactionItems, total, response;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.query, page = _a.page, size = _a.size;
                _b = (0, pagination_1.getPagination)(Number(page), Number(size)), limit = _b.limit, offset = _b.offset;
                transactionItemRepository = (0, typeorm_1.getRepository)(TransactionItem_1.TransactionItem);
                return [4 /*yield*/, transactionItemRepository.findAndCount({
                        take: limit,
                        skip: offset,
                        where: { deleted_at: (0, typeorm_1.IsNull)() },
                    })];
            case 1:
                _c = _d.sent(), transactionItems = _c[0], total = _c[1];
                response = (0, pagination_1.getPagingData)([transactionItems, total], Number(page), limit);
                (0, response_1.successPaginateResponse)(res, response);
                return [2 /*return*/];
        }
    });
}); };
exports.listTransactionItems = listTransactionItems;
// GET /api/transactions/:transaction_uid/transaction-item/:transaction_item_uid
var getTransactionItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionItemRepository, transactionItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionItemRepository = (0, typeorm_1.getRepository)(TransactionItem_1.TransactionItem);
                return [4 /*yield*/, transactionItemRepository.findOne({
                        where: { transaction_item_uid: req.params.transaction_item_uid, deleted_at: (0, typeorm_1.IsNull)() },
                    })];
            case 1:
                transactionItem = _a.sent();
                (0, response_1.successResponse)(res, transactionItem);
                return [2 /*return*/];
        }
    });
}); };
exports.getTransactionItem = getTransactionItem;
// PUT /api/transactions/:transaction_uid/transaction-item/:transaction_item_uid
var updateTransactionItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionItemRepository, transactionItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionItemRepository = (0, typeorm_1.getRepository)(TransactionItem_1.TransactionItem);
                return [4 /*yield*/, transactionItemRepository.update({
                        transaction_item_uid: req.params.transaction_item_uid,
                        deleted_at: (0, typeorm_1.IsNull)()
                    }, __assign(__assign({}, req.body), { updated_at: new Date() }))];
            case 1:
                transactionItem = _a.sent();
                (0, response_1.successResponse)(res, transactionItem, 'Success updated data', 201);
                return [2 /*return*/];
        }
    });
}); };
exports.updateTransactionItem = updateTransactionItem;
// DELETE /api/transactions/:transaction_uid/transaction-item/:transaction_item_uid
var deleteTransactionItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionItemRepository, transactionItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionItemRepository = (0, typeorm_1.getRepository)(TransactionItem_1.TransactionItem);
                return [4 /*yield*/, transactionItemRepository.update({
                        transaction_item_uid: req.params.transaction_item_uid,
                        deleted_at: (0, typeorm_1.IsNull)()
                    }, {
                        deleted_at: new Date(),
                    })];
            case 1:
                transactionItem = _a.sent();
                (0, response_1.successResponse)(res, transactionItem, 'Success deleted data', 204);
                return [2 /*return*/];
        }
    });
}); };
exports.deleteTransactionItem = deleteTransactionItem;
