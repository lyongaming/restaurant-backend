import express from "express";

import { signup, signin, refreshToken } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/refresh_token", refreshToken);

export default router;