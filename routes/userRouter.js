import { getUsers, getUserPosts } from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

router.get("/users/:searchInput", getUsers);
router.get("/user/:id", getUserPosts);

export default router;