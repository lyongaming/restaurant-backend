"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../services/auth");
const token_1 = require("../helpers/token");
const prisma = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserData = req.body;
    const client = yield (0, auth_1.register)(newUserData);
    client ? res.json(client) : res.json({ msg: "Something failed" });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const client = yield (0, auth_1.login)(userData);
    if (client) {
        const access_token = (0, token_1.createAccessToken)({ id: client.id });
        const refresh_token = (0, token_1.createRefreshToken)({ id: client.id });
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            path: "/api/refresh_token",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        res.json({ token: access_token, user: client });
    }
    else {
        res.json({ msg: "This user doesn't exist" });
    }
});
exports.signin = signin;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_token = req.cookies.refresh_token;
    if (refresh_token)
        res.status(400).json({ msg: "Please login now" });
    else {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refreshtokensecret";
        const payload = jsonwebtoken_1.default.verify(refresh_token, refreshTokenSecret);
        0;
        const client = yield prisma.clients.findUnique({ where: { id: payload.id } });
        if (!client)
            res.status(400).json({ msg: "This user doesn't exist" });
        else {
            const access_token = (0, token_1.createAccessToken)({ id: payload.id });
            res.json({ token: access_token, client });
        }
    }
});
exports.refreshToken = refreshToken;
