import { Router } from "express";
import { authController } from "../controllers/authController.js";
const router = Router()

// Route til liste af posts - base route i index.ts er /posts
router.post("/login", authController.authenticate)

export const authRoutes = router