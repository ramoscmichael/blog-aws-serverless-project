"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const consoleTransport = new winston_1.default.transports.Console();
winston_1.default.add(consoleTransport);
exports.default = winston_1.default;
//# sourceMappingURL=logger.js.map