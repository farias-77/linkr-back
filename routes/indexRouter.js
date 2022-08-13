import { Router } from "express";

import authRouter from "./authRouter.js";
import usersRouter from "./userRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import likesRouter from "./likesRouter.js";
import postsRouter from "./postsRouter.js"

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(hashtagRouter);
router.use(likesRouter);
router.use(postsRouter);



export default router;