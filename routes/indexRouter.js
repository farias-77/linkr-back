import { Router } from "express";

import authRouter from "./authRouter.js";
import hashtagRouter from "./hashtagRouter.js";

const router = Router();

router.use([authRouter,hashtagRouter]);



export default router;