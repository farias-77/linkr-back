import { Router } from "express";
import { middleware } from "../middlewares/schemasMiddleware.js"
import { schemas } from "../schemas/authSchemas.js"
import { signUp } from "../controllers/authController.js";

const router = Router();

router.post("/signup", middleware(schemas.signUpSchema), signUp);

export default router;