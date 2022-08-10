import { getUsers, getUserPosts } from "../controllers/userController.js";
import { tokenMiddleware } from "../middlewares/tokenMiddleware";
import { Router } from "express";

const router = Router();

router.get("/users/:searchInput", tokenMiddleware, getUsers);
router.get("/user/:id", tokenMiddleware, getUserPosts);

export default router;