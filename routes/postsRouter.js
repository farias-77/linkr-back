import { Router } from "express";
import { registerPost, deletePost } from "../controllers/postsController.js";
import { registerPostMiddleWare, userValidation, deleteLikes, deleteMetadata, deletePosts_Hashtags } from "../middlewares/postsMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.post("/register-post", tokenMiddleware, registerPostMiddleWare, registerPost);
router.delete("/delete-post/:postId", tokenMiddleware, userValidation, deleteLikes, deleteMetadata, deletePosts_Hashtags, deletePost);

export default router;