import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const access_token : string = process.env.ACCESS_TOKEN_SECRET || "accesstokensecret";  
const refresh_token : string = process.env.REFRESH_TOKEN_SECRET || "refreshtokensecret";  

export const createAccessToken = (payload : Object) : string => {
    return jwt.sign(payload, access_token, { expiresIn: "1d" });
}

export const createRefreshToken = (payload : Object) : string => {
    return jwt.sign(payload, refresh_token, { expiresIn: "30d" });
}