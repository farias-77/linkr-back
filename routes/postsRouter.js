import { Router } from "express";
import { registerPost, deletePost } from "../controllers/postsController.js";
import { registerPostMiddleWare } from "../middlewares/postsMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.post("/register-post", tokenMiddleware, registerPostMiddleWare, registerPost);
router.delete("/delete-post/:postId", tokenMiddleware, deletePost);

export default router;