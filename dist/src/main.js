"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '50mb', type: 'application/json' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Your API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
    },
    apis: ["**/*.{ts,js"] // Specify the file that contains your route definitions
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use("/api", routes_1.default);
module.exports.handler = (0, serverless_http_1.default)(app);
//# sourceMappingURL=main.js.map