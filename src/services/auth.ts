import { UserLogin, UserRegister } from "../types";

export const register = (newUser: UserRegister) => {
    console.log(newUser);
}

export const login = (user : UserLogin) => {
    console.log(user);
}