import { Router } from "express";

import authRouter from "./authRouter.js";
import usersRouter from "./userRouter.js";
import hashtagRouter from "./hashtagRouter.js";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(hashtagRouter);


export default router;