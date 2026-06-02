import { Router } from "express";
import { postController } from "../controllers/postController.js";
const router = Router()

// Route til liste af posts - base route i index.ts er /posts
router.get("/", postController.getRecords)
router.get("/:id", postController.getRecord)
router.post("/", postController.createRecord)
router.put("/:id", postController.updateRecord)

export const postRoutes = router