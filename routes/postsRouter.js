import { Router } from "express";
import { registerPost, deletePost, getTimelinePosts, editPost, postComment, getComments, registerRepost, getRepostCount } from "../controllers/postsController.js";
import { registerPostMiddleWare, userValidation, deleteLikes, deleteMetadata, deletePosts_Hashtags, deleteComments, editPostMiddleware,deleteRepostsMetadata, deleteReposts } from "../middlewares/postsMiddleware.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";

const router = Router();

router.get("/timeline/:limit", tokenMiddleware, getTimelinePosts);
router.post("/register-post", tokenMiddleware, registerPostMiddleWare, registerPost);
router.delete("/delete-post/:postId", tokenMiddleware, userValidation, deleteLikes, deleteMetadata, deletePosts_Hashtags, deleteComments, deleteRepostsMetadata, deleteReposts, deletePost);
router.put("/update/:postId",tokenMiddleware,editPostMiddleware, deletePosts_Hashtags, editPost);
router.post("/comment/:postId", tokenMiddleware, postComment);
router.get("/comment/:postId", tokenMiddleware, getComments);
router.post("/repost/:postId", tokenMiddleware, registerRepost);
router.get("/repost/:postId", tokenMiddleware, getRepostCount );

export default router;
