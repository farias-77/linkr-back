import { getUsers, getUserPosts } from "../controllers/userController.js";
import { Router } from "express";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserPosts);

export default router;