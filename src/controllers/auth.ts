import { register } from "../services/auth";

import { ClientRegister } from "../types";

export const signupController = (req : Request, _res : Response) => {
    const newUser : ClientRegister = req.body;
    register(newUser);
}