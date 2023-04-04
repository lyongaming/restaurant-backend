import { PrismaClient } from "@prisma/client";

import { confirmPassword, comparePassword, hashPassword } from "../helpers/auth";
import { UserLogin, UserRegister } from "../types";

const prisma = new PrismaClient();

export const register = async(newUser: UserRegister) => {
    const { password, confirmPass } = newUser;
    if (confirmPassword(password, confirmPass)) {
        const { confirmPass, ...user } = newUser;
        user.password = await hashPassword(user.password);
        const client = await prisma.clients.create({ data: user });
        const { email, password, ...userData } = client;
        return userData;
    }
    return undefined;
}

export const login = async({ email, password } : UserLogin) => {
    const user = await prisma.clients.findFirst({ where: { email } });
    if(user && (await comparePassword(password, user.password))) {
        const { email, password, ...userData } = user;
        return userData;
    }
    return undefined;
}