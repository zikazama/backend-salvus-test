"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagingData = exports.getPagination = void 0;
// src/utils/pagination.ts
var getPagination = function (page, size) {
    var limit = size ? +size : 10;
    var offset = page ? (page - 1) * limit : 0;
    return { limit: limit, offset: offset };
};
exports.getPagination = getPagination;
var getPagingData = function (data, page, limit) {
    var results = data[0], totalItems = data[1];
    var currentPage = page ? +page : 1;
    var totalPages = Math.ceil(totalItems / limit);
    return { totalItems: totalItems, data: results, totalPages: totalPages, currentPage: currentPage };
};
exports.getPagingData = getPagingData;
