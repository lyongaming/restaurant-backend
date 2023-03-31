import { Request, Response } from "express";

import { login, register } from "../services/auth";

import { UserLogin, UserRegister } from "../types";

export const signupController = (req : Request<UserRegister>, _res : Response) => {
    const newUser : UserRegister = req.body;
    register(newUser);
}

export const signinController = (req : Request<UserLogin>, _res : Response) => {
    const user : UserLogin = req.body;
    login(user);
}