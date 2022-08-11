import { getUsers, getUserPosts } from "../controllers/userController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { Router } from "express";

const router = Router();

router.get("/users/:searchInput", tokenMiddleware, getUsers);
router.get("/user", tokenMiddleware, getUserPosts);

export default router;