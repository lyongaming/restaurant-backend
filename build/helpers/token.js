"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const access_token = process.env.ACCESS_TOKEN_SECRET || "accesstokensecret";
const refresh_token = process.env.REFRESH_TOKEN_SECRET || "refreshtokensecret";
const createAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, access_token, { expiresIn: "1d" });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, refresh_token, { expiresIn: "30d" });
};
exports.createRefreshToken = createRefreshToken;
