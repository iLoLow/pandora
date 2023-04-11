import { Router } from "express";
import { getAllImages, deleteImage } from "../controllers/imageController.mjs";
const router = new Router();

router.get("/", getAllImages);
router.delete("/:name", deleteImage);

export default router;
