import express from "express"
import { signup } from "../controllers/oauth.contoller.js";

const router = express.Router();

router.post("/signup", signup)

export default router