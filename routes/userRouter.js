import { getUsers, getUserPosts, getUserInfo, getUserById, followUser } from "../controllers/userController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { followMiddleware } from "../middlewares/followMIddleware.js";
import { Router } from "express";

const router = Router();

router.get("/users/:searchInput", tokenMiddleware, getUsers);
router.get("/user/:id/:limit", tokenMiddleware, getUserPosts);
router.get("/userInfo", tokenMiddleware, getUserInfo);
router.post("/follow/:id", tokenMiddleware, followMiddleware, followUser);
router.get("/user/:id", tokenMiddleware, getUserById);

export default router;