import { Router } from "express";

import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { likeOrDislike, getWhoLiked } from "../controllers/likesController.js";

const router = Router();

router.post("/like/:postId", tokenMiddleware, likeOrDislike);
router.get("/whoLiked/:postId", tokenMiddleware, getWhoLiked);

export default router;