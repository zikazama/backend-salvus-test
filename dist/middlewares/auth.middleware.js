"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateCashier = exports.authenticateAdmin = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var authenticateAdmin = function (req, res, next) {
    var _a, _b;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ message: 'Access denied' });
    try {
        var decoded = jsonwebtoken_1.default.verify(token, (_b = process.env.SECRET_KEY) !== null && _b !== void 0 ? _b : 'default');
        if ((decoded === null || decoded === void 0 ? void 0 : decoded.role) !== 'admin') {
            throw new Error("Role Restricted");
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
exports.authenticateAdmin = authenticateAdmin;
var authenticateCashier = function (req, res, next) {
    var _a, _b;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ message: 'Access denied' });
    try {
        var decoded = jsonwebtoken_1.default.verify(token, (_b = process.env.SECRET_KEY) !== null && _b !== void 0 ? _b : 'default');
        if ((decoded === null || decoded === void 0 ? void 0 : decoded.role) !== 'cashier') {
            throw new Error("Role Restricted");
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
exports.authenticateCashier = authenticateCashier;
