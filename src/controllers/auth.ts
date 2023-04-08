import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

import { login, register } from "../services/auth";

import { UserLogin, UserRegister } from "../types";

import { createAccessToken, createRefreshToken } from "../helpers/token";

const prisma = new PrismaClient();

export const signup = async(req : Request<UserRegister>, res : Response) => {
    const newUserData : UserRegister = req.body;
    const client = await register(newUserData);
    client ? res.json(client) : res.json({ msg: "Something failed" });
}

export const signin = async(req : Request<UserLogin>, res : Response) => {
    const userData : UserLogin = req.body;
    const client = await login(userData);

    if(client) {
        const access_token : string = createAccessToken({ id: client.id });
        const refresh_token : string = createRefreshToken({ id: client.id });

        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            path: "/api/refresh_token",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({ token: access_token, user: client });

    } else {
        res.json({ msg: "This user doesn't exist" });
    }
    
}

export const refreshToken = async(req : Request, res: Response) => {
    const refresh_token = req.cookies.refresh_token;
    if(refresh_token) res.status(400).json({ msg: "Please login now" });
    else {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refreshtokensecret";
        const payload: any = jwt.verify(refresh_token, refreshTokenSecret);0

        const client = await prisma.clients.findUnique({ where: { id: payload.id } });
        if(!client) res.status(400).json({ msg: "This user doesn't exist" });
        else {
            const access_token : string = createAccessToken({ id: payload.id });
            res.json({ token: access_token, client });
        }
    }
}