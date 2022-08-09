import { Router } from "express";

import authRouter from "./authRouter.js";
import usersRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);
router.use(usersRouter);






export default router;