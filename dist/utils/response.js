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
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverErrorResponse = exports.clientErrorResponse = exports.successPaginateResponse = exports.successResponse = void 0;
var successResponse = function (response, data, message, status) {
    if (data === void 0) { data = undefined; }
    if (message === void 0) { message = undefined; }
    if (status === void 0) { status = undefined; }
    response.status(status !== null && status !== void 0 ? status : 200).json({
        status: 'success',
        message: message,
        data: data
    });
};
exports.successResponse = successResponse;
var successPaginateResponse = function (response, data, message, status) {
    if (data === void 0) { data = undefined; }
    if (message === void 0) { message = undefined; }
    if (status === void 0) { status = undefined; }
    response.status(status !== null && status !== void 0 ? status : 200).json(__assign({ status: 'success', message: message }, data));
};
exports.successPaginateResponse = successPaginateResponse;
var clientErrorResponse = function (response, data, message, status) {
    if (data === void 0) { data = undefined; }
    if (message === void 0) { message = 'Bad Request Error'; }
    if (status === void 0) { status = undefined; }
    response.status(status !== null && status !== void 0 ? status : 400).json({
        status: 'error',
        message: message,
        data: data
    });
};
exports.clientErrorResponse = clientErrorResponse;
var serverErrorResponse = function (response, data, message, status) {
    if (data === void 0) { data = undefined; }
    if (message === void 0) { message = 'Internal Server Error'; }
    if (status === void 0) { status = undefined; }
    response.status(status !== null && status !== void 0 ? status : 500).json({
        status: 'error',
        message: message,
        data: data
    });
};
exports.serverErrorResponse = serverErrorResponse;
