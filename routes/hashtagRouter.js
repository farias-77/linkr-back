import { Router } from "express";

import { tokenMiddleware } from "../middlewares/tokenMiddleware.js";
import { getTrendingHashtags, getSingleHashtag } from "../controllers/hashtagController.js";

const router = Router();

router.get("/hashtag/:hashtag",tokenMiddleware, getSingleHashtag);
router.get("/trending",tokenMiddleware, getTrendingHashtags);

export default router;