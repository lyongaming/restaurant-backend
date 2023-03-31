import { Request, Response } from "express";

import { register } from "../services/auth";

import { ClientRegister } from "../types";

export const signupController = (req : Request<ClientRegister>, _res : Response) => {
    const newUser : ClientRegister = req.body;
    register(newUser);
}