import { getUsers, getUserPosts, getUserInfo, getUserById } from "../controllers/userController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { Router } from "express";

const router = Router();

router.get("/users/:searchInput", tokenMiddleware, getUsers);
router.get("/user/:id/:limit", tokenMiddleware, getUserPosts);
router.get("/userInfo", tokenMiddleware, getUserInfo);
router.get("/user/:id", tokenMiddleware, getUserById);

export default router;