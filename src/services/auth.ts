import { PrismaClient } from "@prisma/client";

import { comparePass, hashPassword } from "../helpers/auth";
import { UserLogin, UserRegister } from "../types";

const prisma = new PrismaClient();

export const register = async(newUser: UserRegister) => {
    const { password, confirmPass } = newUser;
    if (comparePass(password, confirmPass)) {
        const { confirmPass, ...user } = newUser;
        user.password = await hashPassword(user.password);
        const client = await prisma.clients.create({ data: user });
        console.log(client);
    }
}

export const login = (user : UserLogin) => {
    console.log(user);
}