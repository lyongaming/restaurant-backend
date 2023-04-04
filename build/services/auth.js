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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const auth_1 = require("../helpers/auth");
const prisma = new client_1.PrismaClient();
const register = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, confirmPass } = newUser;
    if ((0, auth_1.confirmPassword)(password, confirmPass)) {
        const { confirmPass } = newUser, user = __rest(newUser, ["confirmPass"]);
        user.password = yield (0, auth_1.hashPassword)(user.password);
        const client = yield prisma.clients.create({ data: user });
        console.log(client);
    }
});
exports.register = register;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.clients.findFirst({ where: { email } });
    if (user) {
        console.log((0, auth_1.comparePassword)(password, user.password));
    }
});
exports.login = login;
