"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerJson = __importStar(require("./swagger.json"));
const util_1 = require("./util");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '50mb', type: 'application/json' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use("/api", routes_1.default);
app.use('/apiDocs', swagger_ui_express_1.default.serve);
app.get('/apiDocs', swagger_ui_express_1.default.setup(swaggerJson));
module.exports.handler = (0, serverless_http_1.default)(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    util_1.Logger.default.info("start listening to port" + port);
});
//# sourceMappingURL=main.js.map