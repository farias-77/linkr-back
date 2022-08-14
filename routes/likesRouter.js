import { Router } from "express";

import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { likeOrDislike, getLikesList } from "../controllers/likesController.js";

const router = Router();

router.post("/like/:postId", tokenMiddleware, likeOrDislike);
router.get("/like/:postId", tokenMiddleware, getLikesList);

export default router;