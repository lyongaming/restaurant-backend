"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinController = exports.signupController = void 0;
const auth_1 = require("../services/auth");
const signupController = (req, _res) => {
    const newUser = req.body;
    (0, auth_1.register)(newUser);
};
exports.signupController = signupController;
const signinController = (req, _res) => {
    const user = req.body;
    (0, auth_1.login)(user);
};
exports.signinController = signinController;
