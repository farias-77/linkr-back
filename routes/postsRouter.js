import { Router } from "express";
import { registerPost } from "../controllers/postsController.js";
import { registerPostMiddleWare } from "../middlewares/postsMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.post("/register-post", tokenMiddleware, registerPostMiddleWare, registerPost);

export default router;