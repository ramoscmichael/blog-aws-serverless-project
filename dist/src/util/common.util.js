"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponseJson = exports.comparePassword = exports.enrcyptPassword = exports.objectNotNull = exports.fieldNotNull = void 0;
const bcryptjs_1 = require("bcryptjs");
const fieldNotNull = (object, field, errMessage) => {
    if (!(object === null || object === void 0 ? void 0 : object[field]))
        throw { message: errMessage };
};
exports.fieldNotNull = fieldNotNull;
const objectNotNull = (object, errMessage) => {
    if (!object)
        throw { message: errMessage };
};
exports.objectNotNull = objectNotNull;
const enrcyptPassword = (password) => (0, bcryptjs_1.genSalt)(10).then(salt => (0, bcryptjs_1.hash)(password, salt));
exports.enrcyptPassword = enrcyptPassword;
const comparePassword = (inputPassword, hashedPassword) => (0, bcryptjs_1.compare)(inputPassword, hashedPassword);
exports.comparePassword = comparePassword;
const sendResponseJson = (data, res) => data
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json(error));
exports.sendResponseJson = sendResponseJson;
//# sourceMappingURL=common.util.js.map