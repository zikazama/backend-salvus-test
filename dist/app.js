"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var admin_routes_1 = __importDefault(require("./routes/admin.routes"));
var cashier_routes_1 = __importDefault(require("./routes/cashier.routes"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/api', admin_routes_1.default);
app.use('/api', cashier_routes_1.default);
exports.default = app;
