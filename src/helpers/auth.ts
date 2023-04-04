import bcrypt from "bcrypt";

export const confirmPassword = (pass : string, confirmPass : string) : boolean => pass === confirmPass;

export const hashPassword = async(password : string) : Promise<string> => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const comparePassword = async(password: string, hashPassword: string) : Promise<boolean> => {
    const isEqual = await bcrypt.compare(password, hashPassword);
    return isEqual;
}