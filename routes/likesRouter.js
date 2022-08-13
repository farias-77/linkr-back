import { Router } from "express";

import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { likeOrDislike } from "../controllers/likesController.js";

const router = Router();

router.post("/like/:postId", tokenMiddleware, likeOrDislike);

export default router;