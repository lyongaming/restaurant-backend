import { Request, Response } from "express";

import { login, register } from "../services/auth";

import { UserLogin, UserRegister } from "../types";

export const signupController = async(req : Request<UserRegister>, res : Response) => {
    const newUserData : UserRegister = req.body;
    const client = await register(newUserData);
    client ? res.json(client) : res.json({ msg: "Something failed" });
}

export const signinController = async(req : Request<UserLogin>, res : Response) => {
    const userData : UserLogin = req.body;
    const client = await login(userData);
    client ? res.json(client) : res.json({ msg: "This user doesn't exist" });
}