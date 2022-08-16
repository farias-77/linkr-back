import { Router } from "express";
import { registerPost, deletePost, getTimelinePosts, editPost, postComment, getComments } from "../controllers/postsController.js";
import { registerPostMiddleWare, userValidation, deleteLikes, deleteMetadata, deletePosts_Hashtags, editPostMiddleware } from "../middlewares/postsMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.get("/timeline", tokenMiddleware, getTimelinePosts);
router.post("/register-post", tokenMiddleware, registerPostMiddleWare, registerPost);
router.delete("/delete-post/:postId", tokenMiddleware, userValidation, deleteLikes, deleteMetadata, deletePosts_Hashtags, deletePost);
router.put("/update/:postId",tokenMiddleware,editPostMiddleware, deletePosts_Hashtags, editPost);
router.post("/comment/:postId", tokenMiddleware, postComment);
router.get("/comment/:postId", tokenMiddleware, getComments);

export default router;
