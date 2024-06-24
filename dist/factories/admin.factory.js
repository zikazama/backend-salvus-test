"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_seeding_1 = require("typeorm-seeding");
var Admin_1 = require("../entity/Admin");
(0, typeorm_seeding_1.define)(Admin_1.Admin, function (faker) {
    var admin = new Admin_1.Admin();
    admin.email = faker.internet.email();
    admin.username = faker.internet.userName();
    admin.password = faker.internet.password();
    return admin;
});
