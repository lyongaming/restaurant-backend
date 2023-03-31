import { comparePass, hashPassword } from "../helpers/auth";
import { UserLogin, UserRegister } from "../types";

export const register = async(newUser: UserRegister) => {
    const { pass, confirmPass } = newUser;
    if (comparePass(pass, confirmPass)) {
        const { confirmPass, ...user } = newUser;
        user.pass = await hashPassword(user.pass);
        console.log(user.pass);
    }
}

export const login = (user : UserLogin) => {
    console.log(user);
}