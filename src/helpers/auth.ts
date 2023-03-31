import bcrypt from "bcrypt";

export const comparePass = (pass : string, confirmPass : string) : boolean => pass === confirmPass;

export const hashPassword = async(password : string) : Promise<string> => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}