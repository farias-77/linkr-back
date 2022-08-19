import { getUsers, getUserPosts, getUserInfo, getUserById, followUser, unfollowUser } from "../controllers/userController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { followMiddleware, unfollowUserMiddleware } from "../middlewares/followMIddleware.js";
import { Router } from "express";

const router = Router();

router.get("/users/:searchInput", tokenMiddleware, getUsers);
router.get("/user/:id/:limit", tokenMiddleware, getUserPosts);
router.get("/userInfo", tokenMiddleware, getUserInfo);
router.post("/follow/:id", tokenMiddleware, followMiddleware, followUser);
router.get("/user/:id", tokenMiddleware, getUserById);
router.delete("/unfollow/:id", tokenMiddleware, unfollowUserMiddleware, unfollowUser);

export default router;