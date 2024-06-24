"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
var app_1 = __importDefault(require("./app"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
(0, typeorm_1.createConnection)().then(function () {
    app_1.default.listen(PORT, function () {
        console.log("Server is running on port ".concat(PORT));
    });
}).catch(function (error) { return console.log(error); });
