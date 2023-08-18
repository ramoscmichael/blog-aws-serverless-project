"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = require("../package.json");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "abc project",
            version: package_json_1.version
        }
    },
    apis: ["**/*.{ts,js"]
};
exports.default = options;
//# sourceMappingURL=swagger.js.map