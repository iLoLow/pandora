import { Router } from "express";
import { getAllImages, deleteImage } from "../controllers/imageController.mjs";
import { verifyToken, checkIsAdmin } from "../middlewares/auth.mjs";
const router = new Router();

router.get("/", verifyToken, checkIsAdmin, getAllImages);
router.delete("/:id", verifyToken, checkIsAdmin, deleteImage);

export default router;
